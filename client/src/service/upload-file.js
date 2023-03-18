export const uploadFile = file => {
	let promise = new Promise(resolve => {
		const { name, size, lastModified } = file;

		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = e => {
			const binaryFile = e.target.result;

			resolve({
				binaryFile,
				fileAttributes: { name, size, lastModified },
			});
		};
	});
	return promise;
};
