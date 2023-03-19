import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import TableStages from '../components/Tables/Stages/TableStages';
import Button from '../components/UI/Button/Button';
import useTitle from '../hook/useTitle';

const EditStageList = () => {
	useTitle('Редактирование данных этапа');
	const { seriesId } = useParams();
	const navigate = useNavigate();
	const goBack = () => navigate(-1);

	return (
		<div>
			<h3 className="titlePage-3">Этапы серии</h3>
			<TableStages seriesId={seriesId} />
			<Button getClick={goBack}>назад</Button>
		</div>
	);
};

export default EditStageList;
