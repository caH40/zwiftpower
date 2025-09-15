import { Types } from 'mongoose';
import slugify from 'slugify';

import { NSeriesModel } from '../../Model/NSeries.js';
import { Organizer } from '../../Model/Organizer.js';
import { imageStorageHandler } from '../organizer/files/imageStorage-handler.js';
import { parseAndGroupFileNames } from '../../utils/parseAndGroupFileNames.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { organizerSeriesAllDto, organizerSeriesOneDto } from '../../dto/series.js';

// types
import {
  TOrganizerSeriesAllResponseDB,
  TOrganizerSeriesOneResponseDB,
} from '../../types/mongodb-response.types.js';
import { TOrganizerSeriesAllDto, TOrganizerSeriesOneDto } from '../../types/dto.interface.js';
import { TFileMetadataForCloud, TSeriesStage } from '../../types/model.interface.js';
import {
  SeriesDataFromClientForCreateFull,
  SeriesStagesFromClientForPatch,
  TResponseService,
} from '../../types/http.interface';
import { handleAndLogError } from '../../errors/error.js';
import { Cloud } from '../cloud.js';
import { TParamsSeriesServiceAddStage } from '../../types/types.interface.js';
import { getDateSuffix, setEndOfDay } from '../../utils/date-local.js';

export class SeriesService {
  constructor() {}

  // Получение всех серий заездов.
  public async getAll(
    organizerId: Types.ObjectId
  ): Promise<TResponseService<TOrganizerSeriesAllDto[]>> {
    const seriesDB = await NSeriesModel.find(
      { organizer: organizerId },
      SeriesService.SERIES_ALL_FOR_ORGANIZER_PROJECTION
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
      { name: true, posterFileInfo: true, logoFileInfo: true }
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
    await this.deleteImagesFromCloud(baseNames);

    return {
      data: null,
      message: `Удалена серия с названием "${
        seriesDB.name
      }". Отвязаны эвенты (этапы) от удаленной серии в количестве: ${
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
    const { logoFileInfo, posterFileInfo } = await this.saveImages({
      name,
      shortName,
      logoFile,
      posterFile,
    });

    // // Итоговые данные для сохранения в БД.
    const query = {
      urlSlug,
      organizer: organizerId,
      hasGeneral,
      hasTeams,
      isFinished,
      dateStart,
      dateEnd: setEndOfDay(dateEnd),
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
  }: SeriesDataFromClientForCreateFull): Promise<TResponseService<null>> {
    const { shortName } = await this.checkOrganizer(organizerId);

    // !!! При изменённом name после редактирования Серии urlSlug не изменяется и остается первоначальным.

    const seriesDB = await NSeriesModel.findOne({ _id: seriesId });

    if (!seriesDB) {
      throw new Error(`Не найдена изменяемая Серия с _id: "${seriesId}"`);
    }

    // Создание название файла для изображения и сохранение файла в объектом хранилище Облака.
    const { logoFileInfo, posterFileInfo } = await this.saveImages({
      name,
      shortName,
      baseNameLogoOld: seriesDB.logoFileInfo?.baseName,
      baseNamePosterOld: seriesDB.posterFileInfo?.baseName,
      logoFile,
      posterFile,
    });

    // Итоговые данные для сохранения в БД.
    const updateFields = {
      organizer: organizerId,
      hasGeneral,
      hasTeams,
      isFinished,
      dateStart,
      dateEnd: setEndOfDay(dateEnd),
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
   */
  public async patchStage({
    seriesId,
    stage,
  }: Omit<SeriesStagesFromClientForPatch, 'action'>): Promise<TResponseService<null>> {
    const seriesDB = await NSeriesModel.findOneAndUpdate(
      { _id: seriesId, 'stages.event': stage.event },
      { $set: { 'stages.$': stage } },
      { projection: { name: true }, new: true }
    ).lean();

    // Если серия не найдена, выбрасываем ошибку.
    if (!seriesDB) {
      throw new Error(`Не найдена изменяемая Серия с _id: "${seriesId}"`);
    }

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
    const stagesUpdated = [...stages.filter((elm) => String(elm.event) !== stage.event), stage];

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
   * Приватный метод удаления этапа из Серию заездов.
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

  private static SERIES_ALL_FOR_ORGANIZER_PROJECTION = {
    _id: true,
    dateEnd: true,
    dateStart: true,
    isFinished: true,
    logoFileInfo: true,
    stages: true,
    name: true,
    posterFileInfo: true,
    urlSlug: true,
    type: true,
  };

  /**
   * Метод работы с файлами изображений. Создание название для файлов и сохранение их в Облаке.
   */
  private saveImages = async ({
    name,
    shortName,
    baseNameLogoOld,
    baseNamePosterOld,
    logoFile,
    posterFile,
  }: {
    name: string;
    shortName: string;
    baseNameLogoOld?: string; // Базовое название файла изображениям в облаке.
    baseNamePosterOld?: string; // Базовое название файла изображениям в облаке.
    logoFile: Express.Multer.File | undefined;
    posterFile: Express.Multer.File | undefined;
  }): Promise<{
    logoFileInfo: TFileMetadataForCloud | null;
    posterFileInfo: TFileMetadataForCloud | null;
  }> => {
    // Суффикс для названия файла в объектном хранилище в Облаке.
    const entitySuffix = `series-${slugify(name, {
      lower: true,
      strict: true,
    })}`;

    // Создание название файла для изображения и сохранение файла в облачном хранилище Облака.
    const { uploadedFileNamesLogo, uploadedFileNamesPoster } = await imageStorageHandler({
      shortName: shortName.toLowerCase(),
      baseNameLogoOld,
      baseNamePosterOld,
      logoFile,
      posterFile,
      entitySuffix,
    });

    const logoFileInfo = parseAndGroupFileNames(uploadedFileNamesLogo);
    const posterFileInfo = parseAndGroupFileNames(uploadedFileNamesPoster);

    return { logoFileInfo, posterFileInfo };
  };

  /**
   * Удаление файлов из объектного хранилища при удалении Серии заездов.
   */
  private deleteImagesFromCloud = async (baseNames: (string | undefined)[]): Promise<void> => {
    // Удаление замещенных (старых) файлов изображений из облака.
    const cloud = new Cloud({ cloudName: 'vk', maxSizeFileInMBytes: 5 });

    for (const baseName of baseNames) {
      if (!baseName) {
        continue;
      }
      await cloud
        .deleteFiles({
          prefix: baseName,
        })
        .catch((e) => handleAndLogError(e));
    }
  };
}
