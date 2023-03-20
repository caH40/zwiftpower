export const resultClear = {
	stageId: '',
	name: '',
	zwiftId: 0,
	time: 0,
	weightInGrams: 0,
	watt: 0,
	wattPerKg: 0,
	heightInCentimeters: 0,
	avgHeartRate: 0,
	category: 'C',
	categoryCurrent: '',
	imageSrc: '',
	gender: 'мужской',
	DNF: 'нет',
};

export const getScroll = element => {
	const scrollTarget = element;
	const topOffset = 70;
	const elementPosition = scrollTarget.getBoundingClientRect().top;
	const offsetPosition = elementPosition - topOffset;
	window.scrollBy({
		top: offsetPosition,
		behavior: 'smooth',
	});
};
