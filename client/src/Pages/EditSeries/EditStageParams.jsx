import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getStage, postStage } from '../../api/stage';
import Button from '../../components/UI/Button/Button';
import FormEditSeries from '../../components/UI/FormEditSeries/FormEditSeries';
import FormEditStage from '../../components/UI/FormEditStage/FormEditStage';
import CustomizedSnackbars from '../../components/UI/Snackbars/CustomizedSnackbars';
import { getAlert } from '../../redux/features/alertMessageSlice';

const EditStageParams = () => {
	const [stage, setStage] = useState({});
	const [update, setUpdate] = useState(false);
	const { stageId } = useParams();

	const navigate = useNavigate();
	const getClick = () => navigate(-1);

	const dispatch = useDispatch();

	useEffect(() => {
		getStage(stageId).then(data => {
			setStage(data.stage);
		});
	}, [stageId, update]);
	console.log(stage);
	const sendForm = () => {
		postStage(stage).then(data => {
			setUpdate(prev => !prev);
			dispatch(getAlert({ message: data.message, type: data.type, isOpened: true }));
		});
	};

	return (
		<CustomizedSnackbars>
			{stage._id ? (
				<>
					<section className="page__block">
						<h3 className="titlePage-3">Редактирование параметров Этапа {stageId}</h3>
						<FormEditStage stage={stage} setStage={setStage} />
						<div className="align-right">
							<Button getClick={sendForm}>сохранить</Button>
						</div>
						<Button getClick={getClick}>назад</Button>
					</section>
				</>
			) : (
				'Loading'
			)}
		</CustomizedSnackbars>
	);
};

export default EditStageParams;
