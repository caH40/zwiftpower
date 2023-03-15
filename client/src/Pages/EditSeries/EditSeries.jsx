import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSeriesOne, postSeries } from '../../api/series';
import TableStagesForEdit from '../../components/Tables/Stages/TableStagesForEdit';
import Button from '../../components/UI/Button/Button';
import FormEditSeries from '../../components/UI/FormEditSeries/FormEditSeries';
import CustomizedSnackbars from '../../components/UI/Snackbars/CustomizedSnackbars';
import useTitle from '../../hook/useTitle';
import { getAlert } from '../../redux/features/alertMessageSlice';

const EditSeries = () => {
	const [series, setSeries] = useState({});
	const [update, setUpdate] = useState({});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const getClick = () => navigate(-1);
	useTitle('Редактирование данных Series');
	const { seriesId } = useParams();

	useEffect(() => {
		getSeriesOne(seriesId).then(data => {
			setSeries(data);
		});
	}, [seriesId, update]);
	const sendForm = () => {
		postSeries(series).then(data => {
			setUpdate(prev => !prev);
			dispatch(getAlert({ message: data.message, type: data.type, isOpened: true }));
		});
	};

	return (
		<CustomizedSnackbars>
			{series.name ? (
				<>
					<section className="page__block">
						<h3 className="titlePage-3">Редактирование "{series.name}"</h3>
						<FormEditSeries series={series} setSeries={setSeries} />
						<div className="align-right">
							<Button getClick={sendForm}>сохранить</Button>
						</div>
						<Button getClick={getClick}>назад</Button>
					</section>
					<section className="page__block">
						<TableStagesForEdit seriesId={seriesId} />
						<div className="align-right">
							<Button>добавить</Button>
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

export default EditSeries;
