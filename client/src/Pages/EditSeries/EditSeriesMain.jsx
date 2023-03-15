import React from 'react';

import { useNavigate } from 'react-router-dom';
import TableSeries from '../../components/Tables/Series/TableSeries';
import Button from '../../components/UI/Button/Button';
import useTitle from '../../hook/useTitle';

const EditSeriesMain = () => {
	useTitle('Редактирование данных Series');

	const navigate = useNavigate();
	const goBack = () => navigate(-1);

	return (
		<>
			<h3 className="titlePage-3">Выберите Series для редактирования</h3>
			<TableSeries target={'series'} />
			<Button getClick={goBack}>назад</Button>
		</>
	);
};

export default EditSeriesMain;
