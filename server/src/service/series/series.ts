import slugify from 'slugify';
import { NSeriesModel } from '../../Model/NSeries.js';
import {
  SeriesDataFromClientForCreateFull,
  TResponseService,
} from '../../types/http.interface';
import { Organizer } from '../../Model/Organizer.js';
import { imageStorageHandler } from '../organizer/files/imageStorage-handler.js';
import { parseAndGroupFileNames } from '../../utils/parseAndGroupFileNames.js';
import { Types } from 'mongoose';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import {
  TOrganizerSeriesAllResponseDB,
  TOrganizerSeriesOneResponseDB,
} from '../../types/mongodb-response.types.js';
import { organizerSeriesAllDto, organizerSeriesOneDto } from '../../dto/series.js';
import { TOrganizerSeriesAllDto, TOrganizerSeriesOneDto } from '../../types/dto.interface.js';

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
      { name: true }
    ).lean();

    if (!seriesDB) {
      throw new Error(`Не найдена серия с id: "${seriesId}" для удаления!`);
    }

    // Удаление привязки серии (_id) в эвентах (этапах серии)
    const eventsUpdated = await ZwiftEvent.updateMany(
      { seriesId },
      { $unset: { seriesId: '' } }
    );

    return {
      data: null,
      message: `Удалена серия с названием "${seriesDB.name}". Отвязаны эвенты (этапы) от удаленной серии в количестве: ${eventsUpdated.modifiedCount}`,
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
    stages,
    type,
    organizerId,
    logoFile,
    posterFile,
  }: SeriesDataFromClientForCreateFull): Promise<TResponseService<null>> {
    const { shortName } = await this.checkOrganizer(organizerId);

    // Создание уникального названия для url.
    const urlSlug = slugify(`${shortName} -${name}`, { lower: true, strict: true });

    // Проверка на уникальность названия Серии у данного Организатора.
    await this.checkUrlSlug({ urlSlug, name });

    // Суффикс для названия файла в объектном хранилище в Облаке.
    const entitySuffix = `series-${slugify(name, {
      lower: true,
      strict: true,
    })}`;

    // Создание название файла для изображения и сохранения в облачном хранилище Облака.
    const { uploadedFileNamesLogo, uploadedFileNamesPoster } = await imageStorageHandler({
      shortName: shortName.toLowerCase(),
      logoFile,
      posterFile,
      entitySuffix,
    });

    const logoFileInfo = parseAndGroupFileNames(uploadedFileNamesLogo);
    const posterFileInfo = parseAndGroupFileNames(uploadedFileNamesPoster);

    // // Итоговые данные для сохранения в БД.
    const query = {
      urlSlug,
      organizer: organizerId,
      hasGeneral,
      hasTeams,
      isFinished,
      dateStart,
      dateEnd,
      ...(description && { description }),
      ...(mission && { mission }),
      name,
      ...(rules && { rules }),
      stages,
      type,
      organizerId,
      ...(logoFileInfo && { logoFileInfo }),
      ...(posterFileInfo && { posterFileInfo }),
    };

    // Сохранение Серии в БД.
    const response = await NSeriesModel.create(query);

    await this.addSeriesIdToEvents({
      eventIds: stages.map((stage) => stage.event),
      seriesId: response._id,
    });

    return { data: null, message: `Успешна создана Серия с названием "${name}"!` };
  }

  // // Обновление данных серии заездов.
  // public async put({ urlSlug, data }: { urlSlug: string; data: unknown }) {
  //   console.log('SeriesServicePut'); //eslint-disable-line
  // }

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

  private addSeriesIdToEvents = async ({
    eventIds,
    seriesId,
  }: {
    eventIds: string[];
    seriesId: Types.ObjectId;
  }): Promise<void> => {
    const requests = eventIds.map((_id) =>
      ZwiftEvent.findOneAndUpdate({ _id }, { $set: { seriesId } })
    );

    await Promise.all(requests);
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
}
