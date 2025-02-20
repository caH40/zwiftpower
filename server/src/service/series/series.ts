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

  // // Создание серии заездов.
  // public async post({ urlSlug, data }: { urlSlug: string; data: unknown }) {
  //   console.log('SeriesServicePost'); //eslint-disable-line
  // }

  // // Обновление данных серии заездов.
  // public async put({ urlSlug, data }: { urlSlug: string; data: unknown }) {
  //   console.log('SeriesServicePut'); //eslint-disable-line
  // }
}
