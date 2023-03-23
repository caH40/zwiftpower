import React from 'react';
import { uploadProtocol } from '../../service/protocol/protocol';
import DlFile from '../DescriptionList/DlFile/DlFile';
import TableResultsNew from '../Tables/TableEditStageResults/TableResultsNew';
import Button from '../UI/Button/Button';
import InputFile from '../UI/InputFile/InputFile';

import styles from './UploadResults.module.css';

const UploadResults = ({ results, setResults, saveResults }) => {
	const getFile = async event => {
		const protocol = await uploadProtocol(event.target.files[0]);
		setResults(protocol);
	};

	return (
		<>
			{results.results?.length ? (
				<>
					<DlFile file={results.fileAttributes} addCls="mbRem" />
					<TableResultsNew results={results.results} />
				</>
			) : (
				''
			)}
			<div className={styles.box__buttons}>
				<InputFile accept={'.json'} getFile={getFile} />
				{results.results?.length ? <Button getClick={saveResults}>Сохранить</Button> : ''}
			</div>
		</>
	);
};

export default UploadResults;
