import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import TableEditStage from '../components/Tables/EditStage/TableEditStage';
import Button from '../components/UI/Button/Button';

const EditStage = () => {
	const { seriesId, stageId } = useParams();
	const navigate = useNavigate();
	const getClick = () => navigate(-1);
	return (
		<>
			<h3 className="titlePage-3">Редактирование данных заезда</h3>
			<TableEditStage seriesId={seriesId} stageId={stageId} />
			<Button getClick={getClick}>назад</Button>
		</>
	);
};

export default EditStage;
