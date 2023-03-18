export const addClasses = (additionalClasses, classes) =>
	additionalClasses
		.split(' ')
		.map(elm => classes[elm])
		.join(' ');
