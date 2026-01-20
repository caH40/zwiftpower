import { FilterQuery, Types } from 'mongoose';
import slugify from 'slugify';

import { NSeriesModel } from '../../Model/NSeries.js';
import { Organizer } from '../../Model/Organizer.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { organizerSeriesAllDto, organizerSeriesOneDto } from '../../dto/series.js';
import { ImagesService } from '../Images.js';
import { getDateSuffix, setEndOfDay } from '../../utils/date-local.js';
import { handleAndLogError } from '../../errors/error.js';
import { HandlerSeries } from './HandlerSeries.js';
import { SeriesGCManager } from './SeriesGCManager.js';
import { SERIES_WITH_STAGE_RESULTS } from '../../assets/constants.js';

// types
import {
  TOrganizerSeriesAllResponseDB,
  TOrganizerSeriesOneResponseDB,
} from '../../types/mongodb-response.types.js';
import { TOrganizerSeriesAllDto, TOrganizerSeriesOneDto } from '../../types/dto.interface.js';
import { TSeries, TSeriesStage, TSeriesType } from '../../types/model.interface.js';
import {
  SeriesDataFromClientForCreateFull,
  SeriesStagesFromClientForPatch,
  TResponseService,
} from '../../types/http.interface.js';
import {
  entityForFileSuffix,
  TParamsSeriesServiceAddStage,
} from '../../types/types.interface.js';
import { SeriesStageProtocolManager } from './SeriesStageProtocolManager.js';
import { GCProviderFactory } from './GCProviderFactory.js';

/**
 * Класс работы с Серией заездов для Организаторов.
 */
export class SeriesOrganizerService {
  private imagesService: ImagesService;

  entityName: entityForFileSuffix;
  constructor() {
    this.imagesService = new ImagesService();
    this.entityName = 'series';
  }

  // Получение всех серий заездов.
  public async getAll(
    organizerId: Types.ObjectId
  ): Promise<TResponseService<TOrganizerSeriesAllDto[]>> {
    const seriesDB = await NSeriesModel.find(
      { organizer: organizerId },
      SeriesOrganizerService.SERIES_ALL_FOR_ORGANIZER_PROJECTION
    )
      .populate({ path: 'stages.event', select: ['name', 'eventStart'] })
      .lean<TOrganizerSeriesAllResponseDB[]>();

    const seriesAfterDto = organizerSeriesAllDto(seriesDB);

    // Сортировка, сначала более новые Серии.
    seriesAfterDto.sort(
      (a, b) => new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime()
    );

    return { data: seriesAfterDto, message: 'Все Серии заездов, созданные организатором.' };
  }

  /**
   * Получение запрашиваемой серии заездов.
   */
  public async get({
    seriesId,
    organizerId,
  }: {
    seriesId: string;
    organizerId: Types.ObjectId;
  }): Promise<TResponseService<TOrganizerSeriesOneDto>> {
    const seriesDB = await NSeriesModel.findOne({
      _id: seriesId,
      organizer: organizerId,
    })
      .populate({ path: 'stages.event', select: ['name', 'eventStart'] })
      .lean<TOrganizerSeriesOneResponseDB>();

    if (!seriesDB) {
      throw new Error(
        `Не найдена запрашиваемая серия с _id: "${seriesId}", Организатором с _id: "${organizerId}"`
      );
    }

    const seriesOneAfterDto = organizerSeriesOneDto(seriesDB);

    // Сортировка этапов по возрастанию номера этапа (order).
    seriesOneAfterDto.stages.sort((a, b) => a.order - b.order);

    return {
      data: seriesOneAfterDto,
      message: 'Данные запрашиваемой Серии заездов для редактирования.',
    };
  }

  /**
   * Удаляет серию заездов и отвязывает связанные эвенты (этапы серии).
   *
   * @param {Object} params - Параметры удаления.
   * @param {string} params.seriesId - Идентификатор удаляемой серии.
   * @returns {Promise<TResponseService<null>>} Объект с сообщением о результате операции.
   * @throws {Error} Если серия с указанным ID не найдена.
   */
  public delete = async ({
    seriesId,
  }: {
    seriesId: string;
  }): Promise<TResponseService<null>> => {
    // Поиск и удаление серии с получением только name
    const seriesDB = await NSeriesModel.findOneAndDelete(
      { _id: seriesId },
      { stages: 1, name: true, posterFileInfo: true, logoFileInfo: true }
    ).lean();

    if (!seriesDB) {
      throw new Error(`Не найдена серия с id: "${seriesId}" для удаления!`);
    }

    // Удаление привязки серии (_id) в эвентах (этапах серии)
    const eventsUpdated = await ZwiftEvent.updateMany(
      { seriesId },
      { $unset: { seriesId: '' } }
    ).catch((e) => handleAndLogError(e));

    // Удаление замещенных (старых) файлов изображений из облака.
    const baseNames = [seriesDB.posterFileInfo?.baseName, seriesDB.logoFileInfo?.baseName];
    await this.imagesService.delete(baseNames);

    // Удаление результатов этапов серии заездов.
    const requestForDelete = seriesDB.stages.map(({ order }) =>
      this.deleteOutdatedStageResults(seriesId, order)
    );
    await Promise.all(requestForDelete);

    // Удаление Генеральной классификации серии заездов.
    const seriesGCManager = new SeriesGCManager(seriesId);
    await seriesGCManager.delete();

    return {
      data: null,
      message: `Удалена серия с названием "${
        seriesDB.name
      }". Отвязаны эвенты от удаленной серии в количестве: ${
        eventsUpdated?.modifiedCount || 0
      }`,
    };
  };

  // Создание серии заездов.
  public async post({
    hasGeneral,
    hasTeams,
    isFinished,
    dateStart,
    dateEnd,
    description,
    mission,
    name,
    rules,
    prizes,
    type,
    organizerId,
    logoFile,
    posterFile,
    riderCategoryRule,
    finishTimeLimitOnStage,
    timeGapThresholdSeconds,
  }: SeriesDataFromClientForCreateFull): Promise<TResponseService<null>> {
    const { shortName } = await this.checkOrganizer(organizerId);

    // Создание уникального названия для url.
    const urlSlug = slugify(`${shortName}-${name}-${getDateSuffix()}`, {
      lower: true,
      strict: true,
    });

    // Проверка на уникальность названия Серии у данного Организатора.
    await this.checkUrlSlug({ urlSlug, name });

    // Создание название файла для изображения и сохранение файла в объектом хранилище Облака.
    const { logoFileInfo, posterFileInfo } = await this.imagesService.save({
      name,
      shortName,
      logoFile,
      posterFile,
      entity: this.entityName,
    });

    // Определение создания отдельных результатов для каждого этапа.
    const useStageResults = this.getUseStageResults(type);

    // Итоговые данные для сохранения в БД.
    const query: FilterQuery<TSeries> = {
      urlSlug,
      organizer: organizerId,
      hasGeneral,
      hasTeams,
      isFinished,
      dateStart,
      dateEnd: setEndOfDay(dateEnd),
      useStageResults,
      riderCategoryRule,
      finishTimeLimitOnStage,
      timeGapThresholdSeconds,
      ...(description && { description }),
      ...(mission && { mission }),
      ...(prizes && { prizes }),
      name,
      ...(rules && { rules }),
      type,
      organizerId,
      ...(logoFileInfo && { logoFileInfo }),
      ...(posterFileInfo && { posterFileInfo }),
    };

    // Сохранение Серии в БД.
    await NSeriesModel.create(query);

    return { data: null, message: `Успешна создана Серия с названием "${name}"!` };
  }

  /**
   * Обновление данных Серии заездов.
   */
  public async put({
    hasGeneral,
    hasTeams,
    isFinished,
    dateStart,
    dateEnd,
    description,
    mission,
    name,
    prizes,
    rules,
    type,
    organizerId,
    logoFile,
    posterFile,
    seriesId,
    riderCategoryRule,
    finishTimeLimitOnStage,
    timeGapThresholdSeconds,
  }: SeriesDataFromClientForCreateFull): Promise<TResponseService<null>> {
    const { shortName } = await this.checkOrganizer(organizerId);

    // !!! При изменённом name после редактирования Серии urlSlug не изменяется и остается первоначальным.

    const seriesDB = await NSeriesModel.findOne({ _id: seriesId });

    if (!seriesDB) {
      throw new Error(`Не найдена изменяемая Серия с _id: "${seriesId}"`);
    }

    // Определение создания отдельных результатов для каждого этапа.
    const useStageResults = this.getUseStageResults(type);

    // Создание название файла для изображения и сохранение файла в объектом хранилище Облака.
    const { logoFileInfo, posterFileInfo } = await this.imagesService.save({
      name,
      shortName,
      baseNameLogoOld: seriesDB.logoFileInfo?.baseName,
      baseNamePosterOld: seriesDB.posterFileInfo?.baseName,
      logoFile,
      posterFile,
      entity: this.entityName,
    });

    // Итоговые данные для сохранения в БД.
    const updateFields: FilterQuery<TSeries> = {
      organizer: organizerId,
      hasGeneral,
      hasTeams,
      isFinished,
      dateStart,
      useStageResults,
      dateEnd: setEndOfDay(dateEnd),
      riderCategoryRule,
      finishTimeLimitOnStage,
      timeGapThresholdSeconds,
      ...(description && { description }),
      ...(mission && { mission }),
      ...(prizes && { prizes }),
      name,
      ...(rules && { rules }),
      type,
      organizerId,
      ...(logoFileInfo && { logoFileInfo }),
      ...(posterFileInfo && { posterFileInfo }),
    };

    Object.assign(seriesDB, updateFields);

    // Сохранение Серии в БД.
    await seriesDB.save();

    return { data: null, message: `Обновлены данные Серии "${name}"!` };
  }

  /**
   * Добавление/удаление этапа Серии.
   */
  public async patchStages({
    seriesId,
    stage,
    action,
  }: SeriesStagesFromClientForPatch): Promise<TResponseService<null>> {
    const seriesDB = await NSeriesModel.findOne(
      { _id: seriesId },
      { stages: true, name: true, _id: false }
    ).lean<{ stages: TSeriesStage[]; name: string }>();

    // Если серия не найдена, выбрасываем ошибку.
    if (!seriesDB) {
      throw new Error(`Не найдена изменяемая Серия с _id: "${seriesId}"`);
    }

    if (action === 'add') {
      await this.addStage({ stage, stages: seriesDB.stages, seriesId });
    } else if (action === 'delete') {
      // Удаление Этапа из массива stages.
      await this.deleteStage({ stageId: stage.event, seriesId });

      // Удаление результатов этапа (если они были).
      await this.deleteOutdatedStageResults(seriesId, stage.order);
    } else {
      throw new Error('action имеет значение отличное от add или delete!');
    }

    // Возвращаем успешный ответ.
    return {
      data: null,
      message: `${action === 'add' ? 'Добавлен этап в Серию' : 'Удалён этап из Серии'} "${
        seriesDB.name
      }"!`,
    };
  }

  /**
   * Изменение настроек этапа в Серии заездов.
   * При изменении настроек удалять все результаты соответствующего этапа stageOrder.
   * Если было изменение stageOrder, то удалять результаты прошлого и нового stageOrder.
   */
  public async patchStage({
    seriesId,
    stage,
  }: Omit<SeriesStagesFromClientForPatch, 'action'>): Promise<TResponseService<null>> {
    const seriesDB = await NSeriesModel.findOneAndUpdate(
      { _id: seriesId, 'stages.event': stage.event },
      { $set: { 'stages.$': stage } },
      { projection: { name: 1, stages: 1, type: 1 }, new: false }
    ).lean<Pick<TSeries, '_id' | 'name' | 'stages' | 'type'>>();

    // Если серия не найдена, выбрасываем ошибку.
    if (!seriesDB) {
      throw new Error(`Не найдена изменяемая Серия с _id: "${seriesId}"`);
    }

    await this.deleteOutdatedStageResults(seriesId, stage.order);

    // Создание новых результатов для этапа в котором изменились параметры.
    const seriesStageProtocolManager = new SeriesStageProtocolManager(seriesId);
    await seriesStageProtocolManager.buildStageProtocol(stage.order);

    // Если было изменение stageOrder, то удалять результаты прошлого и нового stageOrder
    const oldStageOrder = seriesDB.stages.find((s) => {
      return s.event.equals(stage.event);
    })?.order;

    const isOrderModified = oldStageOrder !== undefined && stage.order !== oldStageOrder;

    if (isOrderModified) {
      await this.deleteOutdatedStageResults(seriesId, oldStageOrder);
      await seriesStageProtocolManager.buildStageProtocol(oldStageOrder);
    }

    // Перечтет генеральной классификации.
    const gcProvider = new GCProviderFactory(seriesId);
    const gcHandler = gcProvider.getHandler(seriesDB.type);
    await gcHandler.update();

    // Возвращаем успешный ответ.
    return {
      data: null,
      message: `Изменены параметры Этапа с eventId: "${stage.event}" в Серии с _id: "${seriesId}" и названием: "${seriesDB.name}"`,
    };
  }

  /**
   * Получение актуальных (не завершившихся) серий заездов организатора (organizerId).
   */
  public async getActual({
    organizerId,
  }: {
    organizerId: string;
  }): Promise<TResponseService<{ name: string; _id: Types.ObjectId }[]>> {
    const seriesDB = await NSeriesModel.find(
      {
        organizer: organizerId,
        isFinished: false,
      },
      { name: true }
    ).lean<{ name: string; _id: Types.ObjectId }[]>();

    // Возвращаем успешный ответ.
    return {
      data: seriesDB,
      message: 'Актуальные Серии',
    };
  }

  /**
   * Метод добавления (без дублирования по eventId) этапа в Серию заездов.
   */
  public addStage = async ({ stage, stages, seriesId }: TParamsSeriesServiceAddStage) => {
    const lastStageOrder = stages.reduce((acc, cur) => Math.max(acc, cur.order), 0) + 1;

    const stageWithOrder = { ...stage, order: lastStageOrder };
    const stagesUpdated = [
      ...stages.filter((elm) => String(elm.event) !== stage.event),
      stageWithOrder,
    ];

    // Сохранение обновленного массива этапов stages. Не производится проверка найденного документа
    // так как проверялось на верхнем уровне.
    await NSeriesModel.findOneAndUpdate(
      { _id: seriesId },
      { stages: stagesUpdated },
      { projection: { _id: true } }
    ).lean<{ _id: Types.ObjectId }>();

    // Привязка Эвента к текущей Серии seriesId.
    const eventDB = await ZwiftEvent.findOneAndUpdate(
      { _id: stage.event },
      { $set: { seriesId: seriesId } },
      { projection: { _id: true } }
    ).lean<{ _id: Types.ObjectId }>();

    // Если Эвент не найден, то выбрасываем ошибку.
    if (!eventDB) {
      throw new Error(
        `Не найден привязываемый Эвент к Серии с _id:${stage.event}. Но Эвент был добавлен к Серии!`
      );
    }
  };

  /**
   * Приватный метод удаления этапа из Серии заездов.
   */
  private deleteStage = async ({
    stageId,
    seriesId,
  }: {
    stageId: string;
    seriesId: string;
  }) => {
    // Удаление этапа из массива stages.
    await NSeriesModel.findOneAndUpdate(
      { _id: seriesId },
      { $pull: { stages: { event: stageId } } },
      {
        projection: { _id: true, name: true },
        new: true,
      }
    ).lean<{ _id: Types.ObjectId; name: string }>();

    // Отвязываем Эвент от текущей Серии seriesId.
    const eventDB = await ZwiftEvent.findOneAndUpdate(
      { _id: stageId },
      { $set: { seriesId: null } },
      { projection: { _id: true } }
    ).lean<{ _id: Types.ObjectId }>();

    // Если Эвент не найден, то выбрасываем ошибку.
    if (!eventDB) {
      throw new Error(
        `Не найден отвязываемый от Серии Эвент _id:${stageId}. Но сам Эвент был удалён из Серии!`
      );
    }
  };

  /**
   * Проверяет существование Организатора по его _id и возвращает некоторые данные.
   * @param organizerId - ID организатора.
   * @returns Объект с полем shortName.
   * @throws Ошибку, если организатор не найден.
   */
  private checkOrganizer = async (
    organizerId: string | Types.ObjectId
  ): Promise<{ shortName: string }> => {
    const organizerDB = await Organizer.findOne(
      { _id: organizerId },
      { shortName: true }
    ).lean<{ shortName: string }>();

    if (!organizerDB) {
      throw new Error(`Организатор с _id: "${organizerId}" не найден.`);
    }

    return { shortName: organizerDB.shortName };
  };

  /**
   * Проверка на уникальность urlSlug Серии у данного Организатора.
   * @param urlSlug - Уникальный идентификатор серии.
   * @param organizerId - ID организатора (если требуется проверка в рамках конкретного организатора).
   * @throws Ошибку, если такой urlSlug уже существует.
   */
  private checkUrlSlug = async ({
    urlSlug,
    name,
  }: {
    urlSlug: string;
    name: string;
  }): Promise<void> => {
    const existingSeries = await NSeriesModel.findOne({ urlSlug, name }, { _id: true }).lean<{
      _id: Types.ObjectId;
    }>();

    if (existingSeries) {
      throw new Error(
        `Существует Серия с таким названием "${name}" у текущего Организатора. Измените название для Серии на уникальное!`
      );
    }
  };

  /**
   * Удаление результатов этапа stageOrder серии заездов seriesId
   * @param seriesId
   * @param stageOrder
   */
  private deleteOutdatedStageResults = async (
    seriesId: string,
    stageOrder: number
  ): Promise<void> => {
    try {
      const handlerSeries = new HandlerSeries(seriesId);
      await handlerSeries.deleteOutdatedStageResults(stageOrder);
    } catch (error) {
      handleAndLogError(error);
    }
  };

  /**
   * Определение значения параметра getUseStageResults.
   * Ручная настройка данных. Изменения по мере появления сервисов для других type серий.
   */
  private getUseStageResults = (type: TSeriesType): boolean => {
    return SERIES_WITH_STAGE_RESULTS[type] || false;
  };

  private static SERIES_ALL_FOR_ORGANIZER_PROJECTION = {
    _id: true,
    dateEnd: true,
    dateStart: true,
    isFinished: true,
    logoFileInfo: true,
    stages: true,
    riderCategoryRule: true,
    name: true,
    posterFileInfo: true,
    urlSlug: true,
    type: true,
  };
}
