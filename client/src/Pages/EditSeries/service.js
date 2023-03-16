export const stageClear = {
	_id: 'none',
	number: '',
	dateStart: '2023-01-01',
	route: '',
	routeLink: '',
	world: '',
	laps: '',
	distance: '',
	ascent: '',
	type: '',
	quantitySprints: '',
	quantityMountains: '',
	needCount: true,
	hasResults: false,
};

export const isValid = stageNew => {
	if (
		stageNew.number === '' ||
		stageNew.dateStart === '2023-01-01' ||
		stageNew.route === '' ||
		stageNew.routeLink === '' ||
		stageNew.world === '' ||
		stageNew.laps === '' ||
		stageNew.distance === '' ||
		stageNew.ascent === '' ||
		stageNew.type === '' ||
		stageNew.quantitySprints === '' ||
		stageNew.quantityMountains === ''
	)
		return false;

	return true;
};
