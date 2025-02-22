import slugify from 'slugify';
import { NSeriesModel } from '../../Model/NSeries.js';
import {
  SeriesDataFromClientForCreateFull,
  TResponseService,
} from '../../types/http.interface';

export class SeriesService {
  constructor() {}

  // Получение всех серий заездов.
  public async getAll() {
    console.log('SeriesServiceGetAll'); //eslint-disable-line
  }

  // Получение запрашиваемой серии заездов.
  public async get({ urlSlug }: { urlSlug: string }) {
    console.log('SeriesServiceGet', urlSlug); //eslint-disable-line
  }

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
    console.log({
      logoFile,
      posterFile,
    });
    // Создание уникального названия для url.
    const urlSlug = slugify(name, { lower: true, strict: true });

    // Итоговые данные для сохранения в БД.
    const query = {
      urlSlug,
      organizer: organizerId,
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
    };

    await NSeriesModel.create(query);

    return { data: null, message: `Успешна создана Серия с названием "${name}"!` };
  }

  // // Обновление данных серии заездов.
  // public async put({ urlSlug, data }: { urlSlug: string; data: unknown }) {
  //   console.log('SeriesServicePut'); //eslint-disable-line
  // }
}
