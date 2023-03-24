//использование modules
export const addClasses = (additionalClasses, classModule) => {
	try {
		if (!additionalClasses) return;
		return additionalClasses
			.split(' ')
			.map(elm => classModule[elm])
			.join(' ');
	} catch (error) {
		console.log(error); // eslint-disable-line no-console
	}
};
