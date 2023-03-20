import React, { useEffect, useState } from 'react';
import { getRiders } from '../../../api/riders';
import SimpleInput from '../SimpleInput/SimpleInput';
import cls from './BoxRider.module.css';

const BoxRider = () => {
	const [state, setState] = useState({ fio: '' });
	const [riders, setRiders] = useState([]);
	const [filteredRiders, setFilteredRiders] = useState([]);

	useEffect(() => {
		getRiders().then(response => setRiders(response.data.riders));
	}, []);

	useEffect(() => {
		setFilteredRiders(
			[...riders]
				.filter(rider =>
					(rider.firstName.toLowerCase() + ' ' + rider.lastName.toLowerCase()).includes(
						state.fio.toLowerCase()
					)
				)
				.sort((a, b) => a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase()))
				.slice(0, 15)
		);
	}, [state, riders]);

	const getRider = riderId => console.log(riderId);

	return (
		<form className={cls.form} name="riders">
			<SimpleInput
				state={state}
				setState={setState}
				property="fio"
				type="text"
				placeholder="Введите имя (фамилию) райдера"
			/>
			<ul className={cls.list}>
				{riders.length
					? filteredRiders.map(rider => (
							<li className={cls.item} key={rider._id} onClick={() => getRider(rider._id)}>
								{`${rider.lastName} ${rider.firstName} (${rider.firstNameZwift} ${rider.lastNameZwift})`}
							</li>
					  ))
					: undefined}
				{filteredRiders.length > 14 ? (
					<li className={cls.itemMore}>...еще {riders.length - filteredRiders.length} райдеров</li>
				) : undefined}
			</ul>
		</form>
	);
};

export default BoxRider;
