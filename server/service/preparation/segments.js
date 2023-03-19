export function getSegments(stage) {
	try {
		const pointsSprint = [];
		const pointsMountain = [];
		for (let i = 1; i < stage.quantitySprints + 1; i++)
			pointsSprint.push({
				sprint: i,
				place: 'none',
			});
		for (let i = 1; i < stage.quantityMountains + 1; i++)
			pointsMountain.push({
				mountain: i,
				place: 'none',
			});
		return { pointsSprint, pointsMountain };
	} catch (error) {
		throw error;
	}
}
