import * as XLSX from 'xlsx';

import { getCellTitle } from './titles-cell';

export function getScheduleStages(file) {
  try {
    const book = XLSX.read(file, { type: 'binary' });

    const sheetStages = book.Sheets['stages'];

    if (!sheetStages) return console.log('В книге нет страницы "stages"!'); // eslint-disable-line no-console

    const keysStages = Object.keys(sheetStages);
    const rowTitleStages =
      getCellTitle(keysStages, sheetStages, 'Ссылка на заезд в Звифте').slice(1) - 1;
    const totalStages = XLSX.utils.sheet_to_json(sheetStages, {
      range: rowTitleStages,
      raw: false,
    });

    const totalClearStages = totalStages.map((elm) => {
      return {
        number: elm['Этап'],
        dateStart: elm['Дата'],
        timeStart: elm['Время'],
        world: elm['Мир'],
        route: elm['Маршрут'],
        routeLink: elm['Ссылка на маршрут'],
        laps: elm['Количество кругов'],
        distance: elm['Общая протяженность, км'],
        ascent: elm['Общий набор высоты, м'],
        type: elm['Тип заезда'],
        quantitySprints: elm['Количество спринтов'],
        quantityMountains: elm['Количество гор'],
        link: elm['Ссылка на заезд в Звифте'],
      };
    });

    return totalClearStages;
  } catch (error) {
    throw error;
  }
}
