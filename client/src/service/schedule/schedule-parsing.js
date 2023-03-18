import * as XLSX from 'xlsx';
import { getCellTitle } from './titles-cell';

export async function getScheduleFromExcel(file) {
	try {
		const book = XLSX.read(file.result, { type: 'binary' });

		const sheetSeries = book.Sheets['series'];
		if (!sheetSeries) return console.log(`В книге нет страницы "series"!`);

		const keysSeries = Object.keys(sheetSeries);
		const rowTitleSeries =
			getCellTitle(keysSeries, sheetSeries, 'Наименование серии').slice(1) - 1;
		const totalSeries = XLSX.utils.sheet_to_json(sheetSeries, {
			range: rowTitleSeries,
			raw: false,
		});

		const totalClearSeries = totalSeries.map(elm => {
			return {
				name: elm['Наименование серии'],
				dateStart: elm['Дата старта'],
				description: elm['Описание'],
				type: elm['Тип'],
				organizer: elm['Организатор'],
				hasGeneral: elm['Генеральный зачет'] === 'да' ? true : false,
				hasTeams: elm['Командный зачет'] === 'да' ? true : false,
			};
		});

		return { totalClearSeries };
	} catch (error) {
		console.log(error);
	}
}
