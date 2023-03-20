import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getRider, getRiders } from '../../api/riders';
import { getStage } from '../../api/stage';
import SimpleInput from '../../components/UI/SimpleInput/SimpleInput';
import useTitle from '../../hook/useTitle';
import cls from './AddRider.module.css';

const AddRider = () => {
	const [state, setState] = useState({ fio: '' });
	const [rider, setRider] = useState({});
	const [stage, setStage] = useState({});
	const [riders, setRiders] = useState([]);
	const [filteredRiders, setFilteredRiders] = useState([]);

	useTitle('Добавление результата в протокол этапа');
	const { stageId } = useParams();

	useEffect(() => {
		getRiders().then(response => setRiders(response.data.riders));
		getStage(stageId).then(response => setStage(response.data.stage));
	}, [stageId]);

	useEffect(() => {
		setFilteredRiders(
			[...riders]
				.filter(rider =>
					(rider.firstName.toLowerCase() + ' ' + rider.lastName.toLowerCase()).includes(
						state.fio.toLowerCase()
					)
				)
				.sort((a, b) => a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase()))
				.slice(0, 20)
		);
	}, [state, riders]);

	const getRiderData = zwiftId =>
		getRider(zwiftId).then(response => {
			setRider(response.data.rider);
		});
	console.log(rider);

	return (
		<section>
			<h2
				className={cls.title}
			>{`Выберите райдера, чтобы добавить результат в Этап №${stage.number} "${stage.seriesId?.name}"`}</h2>
			<form className={cls.form} name="riders">
				<SimpleInput
					name="Введите имя (фамилию) для поиска райдера"
					state={state}
					setState={setState}
					property="fio"
					type="text"
					placeholder="Введите имя (фамилию) райдера"
				/>
				<ul className={cls.list}>
					{riders.length
						? filteredRiders.map(rider => (
								<li className={cls.item} key={rider._id} onClick={() => getRiderData(rider.zwiftId)}>
									{`${rider.lastName} ${rider.firstName} (${rider.firstNameZwift} ${rider.lastNameZwift})`}
								</li>
						  ))
						: undefined}
					{filteredRiders.length > 14 ? (
						<li className={cls.itemMore}>...еще {riders.length - filteredRiders.length} райдеров</li>
					) : undefined}
				</ul>
			</form>
		</section>
	);
};

export default AddRider;
