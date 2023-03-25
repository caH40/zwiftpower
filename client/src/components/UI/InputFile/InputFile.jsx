import React, { useRef } from 'react';

import Button from '../Button/Button';

import styles from './InputFile.module.css';

function InputFile({ accept, getFile, toolTip }) {
  const inputRef = useRef(null);

  const getInput = () => {
    return inputRef.current.click();
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        className={styles.hidden}
        accept={accept}
        onChange={getFile}
      />
      <Button getClick={getInput} toolTip={toolTip}>
				Выбрать файл
      </Button>
    </>
  );
}

export default InputFile;
