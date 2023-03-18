import React, { useRef } from 'react';
import Button from '../Button/Button';

import cls from './InputFile.module.css';

const InputFile = ({ accept, getFile }) => {
	const inputRef = useRef(null);

	const getInput = () => {
		return inputRef.current.click();
	};

	return (
		<>
			<input
				ref={inputRef}
				type="file"
				className={cls.hidden}
				accept={accept}
				onChange={getFile}
			/>
			<Button getClick={getInput}>Выбрать файл</Button>
		</>
	);
};

export default InputFile;
