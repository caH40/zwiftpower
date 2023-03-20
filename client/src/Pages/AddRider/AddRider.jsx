import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getRider, getRiders } from '../../api/riders';
import { getStage } from '../../api/stage';
import Button from '../../components/UI/Button/Button';
import FormRiderResult from '../../components/UI/FormRiderResult/FormRiderResult';
import FormRiderSearch from '../../components/UI/FormRiderSearch/FormRiderSearch';
import SimpleInput from '../../components/UI/SimpleInput/SimpleInput';
import useTitle from '../../hook/useTitle';
import cls from './AddRider.module.css';
import { getScroll, resultClear } from './service';

const AddRider = () => {
	const [query, setQuery] = useState({ fio: '' });
	const [rider, setRider] = useState({});
	const [stage, setStage] = useState({});
	const [riders, setRiders] = useState([]);
	const [filteredRiders, setFilteredRiders] = useState([]);
	const [newResult, setNewResult] = useState(resultClear);
	const refTitle = useRef(null);

	useTitle('Добавление результата в протокол этапа');
	const { stageId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		getRiders().then(response => setRiders(response.data.riders));
		getStage(stageId).then(response => setStage(response.data.stage));
	}, [stageId]);

	useEffect(() => {
		setFilteredRiders(
			[...riders]
				.filter(rider =>
					(rider.firstName.toLowerCase() + ' ' + rider.lastName.toLowerCase()).includes(
						query.fio.toLowerCase()
					)
				)
				.sort((a, b) => a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase()))
				.slice(0, 20)
		);
	}, [query, riders]);

	const getRiderData = zwiftId => {
		getRider(zwiftId).then(response => {
			setRider(response.data.rider);
			getScroll(refTitle.current);
		});
	};

	const zwiftName = rider.firstNameZwift ? `${rider.firstNameZwift} ${rider.lastNameZwift}` : '';
	useEffect(() => {
		setNewResult({
			stageId,
			name: zwiftName,
			zwiftId: rider.zwiftId || '',
			time: '',
			weightInGrams: '',
			watt: '',
			wattPerKg: '',
			heightInCentimeters: rider.heightInCentimeters || '',
			avgHeartRate: '',
			category: rider.category || '',
			categoryCurrent: '',
			imageSrc: rider.imageSrc || '',
			gender: rider.gender || '',
			DNF: 'нет',
		});
	}, [stageId, rider, zwiftName]);

	const goBack = () => navigate(-1);

	return (
		<section>
			<h2
				className={cls.title}
			>{`Выберите райдера, чтобы добавить результат в Этап №${stage.number} "${stage.seriesId?.name}"`}</h2>
			<FormRiderSearch
				query={query}
				setQuery={setQuery}
				riders={riders}
				filteredRiders={filteredRiders}
				getRiderData={getRiderData}
				goBack={goBack}
			/>
			<h2
				ref={refTitle}
				className={cls.title}
			>{`Заполните данные по заезду райдера ${zwiftName}`}</h2>
			<FormRiderResult newResult={newResult} setNewResult={setNewResult} goBack={goBack} />
		</section>
	);
};

export default AddRider;
