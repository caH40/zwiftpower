import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRiders } from '../../api/riders';
import { getResultStage } from '../../api/stage';

import TableEditStageResults from '../../components/Tables/TableEditStageResults/TableEditStageResults';
import BoxRider from '../../components/UI/BoxRider/BoxRider';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import useTitle from '../../hook/useTitle';
import cls from './EditResults.module.css';

const EditResults = () => {
	const [results, setResults] = useState([]);

	const [update, setUpdate] = useState(false);
	const [isVisibleModal, setIsVisibleModal] = useState(true);

	useTitle('Редактирование данных этапа');

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
			<div className={cls.right}>
				<Button>Добавить</Button>
			</div>
			<Button getClick={getClick}>назад</Button>
			<Modal
				isVisibleModal={isVisibleModal}
				setIsVisibleModal={setIsVisibleModal}
				box={<BoxRider />}
			/>
		</>
	);
};

export default EditResults;
