export const addClasses = (additionalClasses, classes) => {
	if (!additionalClasses) return;
	return additionalClasses
		.split(' ')
		.map(elm => classes[elm])
		.join(' ');
};
