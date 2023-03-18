export function getCellTitle(keys, sheet, title) {
	try {
		for (let i = 0; i < keys.length; i++) {
			if (sheet[keys[i]].v === title) {
				let cellTitle = keys[i];
				return cellTitle;
			}
		}
	} catch (error) {
		console.log(error);
	}
}
