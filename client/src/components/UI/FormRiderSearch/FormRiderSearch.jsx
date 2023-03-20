import React from 'react';

import Button from '../Button/Button';
import SimpleInput from '../SimpleInput/SimpleInput';
import cls from './FormRiderSearch.module.css';

const FormRiderSearch = ({ query, setQuery, riders, filteredRiders, getRiderData, goBack }) => {
	return (
		<form className={cls.form} name="riders">
			<SimpleInput
				name="Введите имя (фамилию) для поиска райдера"
				state={query}
				setState={setQuery}
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
			<Button getClick={goBack} addCls="mb30">
				назад
			</Button>
		</form>
	);
};

export default FormRiderSearch;
