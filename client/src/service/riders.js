import * as XLSX from 'xlsx';

export function downloadXLSX(riders) {
	try {
		let binary = riders.map(rider => {
			return {
				zwiftId: rider.zwiftId,
				fio: `${rider.lastName} ${rider.firstName}`,
				zwiftName: `${rider.firstNameZwift} ${rider.lastNameZwift}`,
				team: rider.teamId?.name,
				trainer: rider.cycleTrainer,
				profileZP: rider.zwiftPower,
				gender: rider.gender,
			};
		});

		let binaryWS = XLSX.utils.json_to_sheet(binary);
		// Create a new Workbook
		var wb = XLSX.utils.book_new();
		// Name your sheet
		XLSX.utils.book_append_sheet(wb, binaryWS, 'riders');
		XLSX.writeFile(wb, 'riders.xlsx');
	} catch (error) {
		console.log(error);
	}
}
