import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getResultStage } from '../../api/stage';

import TableEditStageResults from '../../components/Tables/TableEditStageResults/TableEditStageResults';
import Button from '../../components/UI/Button/Button';

const EditResults = () => {
	const [results, setResults] = useState([]);
	const [update, setUpdate] = useState(false);

	const { stageId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		getResultStage(stageId).then(data => {
			setResults(data.data?.results);
		});
	}, [stageId, update]);

	const getClick = () => navigate(-1);
	return (
		<>
			<h3 className="titlePage-3">Редактирование данных заезда</h3>
			<TableEditStageResults results={results} setUpdate={setUpdate} />
			<Button getClick={getClick}>назад</Button>
		</>
	);
};

export default EditResults;
