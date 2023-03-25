export const uploadFile = (file) => {
  const promise = new Promise((resolve) => {
    const { name, size, lastModified, type } = file;

    if (type.includes('json')) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        const { result } = e.target;
        const resultJson = JSON.parse(result);
        resolve({
          resultJson,
          fileAttributes: { name, size, lastModified },
        });
      };
    } else {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const binaryFile = e.target.result;
        resolve({
          binaryFile,
          fileAttributes: { name, size, lastModified },
        });
      };
    }
  });
  return promise;
};
