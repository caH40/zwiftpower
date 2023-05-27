import React, { useRef } from 'react';

import Button from '../Button/Button';

import styles from './InputFile.module.css';

function InputFile({ accept, getFile, tooltip }) {
  const inputRef = useRef(null);
  const getInput = () => inputRef.current.click();
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        className={styles.hidden}
        accept={accept}
        onChange={getFile}
      />
      <Button getClick={getInput} tooltip={tooltip}>
        Выбрать файл
      </Button>
    </>
  );
}

export default InputFile;
