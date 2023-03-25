import { useState } from 'react';

const useUpload = (fileNew = {}) => {
  const [file, setFile] = useState({});

  // const fileNew = event.target.files[0];
  const { name, size, lastModified } = fileNew;

  const reader = new FileReader();
  reader.readAsText(fileNew);
  reader.onload = (e) => {
    const { result } = e.target;
    const resultJson = JSON.parse(result);
    return [
      file,
      setFile({
        resultJson,
        fileAttributes: { name, size, lastModified },
      }),
    ];
  };
};

export default useUpload;
