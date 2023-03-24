import React from 'react';

import Button from '../Button/Button';
import SimpleInput from '../SimpleInput/SimpleInput';
import SimpleSelect from '../SimpleSelect/SimpleSelect';

import styles from './FormRiderResult.module.css';

const FormRiderResult = ({ newResult, setNewResult, goBack, saveResult }) => {
	return (
		<form className={styles.form}>
			<SimpleInput
				name="Zwift Name"
				state={newResult}
				setState={setNewResult}
				property="name"
				type="text"
				placeholder="Введите имя (фамилию) райдера"
			/>
			<SimpleInput
				name="zwiftId"
				state={newResult}
				setState={setNewResult}
				property="zwiftId"
				type="number"
				disabled={true}
			/>
			<SimpleInput
				name="Время в формате чч:мм:сс"
				state={newResult}
				setState={setNewResult}
				property="time"
				type="text"
			/>
			<SimpleInput
				name="Вес, граммы"
				state={newResult}
				setState={setNewResult}
				value={Math.round((newResult.watt / newResult.wattPerKg) * 1000)}
				property="weightInGrams"
				type="number"
				disabled={true}
			/>
			<SimpleInput
				name="Относительная мощность ватты/кг"
				state={newResult}
				setState={setNewResult}
				property="wattPerKg"
				type="number"
			/>
			<SimpleInput
				name="Средняя мощность, ватты"
				state={newResult}
				setState={setNewResult}
				property="watt"
				type="number"
			/>
			<SimpleInput
				name="Рост, см"
				state={newResult}
				setState={setNewResult}
				property="heightInCentimeters"
				type="number"
			/>
			<SimpleInput
				name="Средний пульс"
				state={newResult}
				setState={setNewResult}
				property="avgHeartRate"
				type="number"
			/>
			<SimpleSelect
				name="Категория"
				state={newResult}
				setState={setNewResult}
				property="category"
				type="text"
				options={[
					{ id: 0, name: 'A' },
					{ id: 1, name: 'B' },
					{ id: 2, name: 'C' },
					{ id: 3, name: 'W' },
					{ id: 4, name: 'WA' },
					{ id: 5, name: 'WB' },
				]}
			/>
			<SimpleSelect
				name="Категория по результату текущего заезда"
				state={newResult}
				setState={setNewResult}
				property="categoryCurrent"
				type="text"
				options={[
					{ id: 0, name: 'A' },
					{ id: 1, name: 'B' },
					{ id: 2, name: 'C' },
					{ id: 3, name: 'W' },
					{ id: 4, name: 'WA' },
					{ id: 5, name: 'WB' },
				]}
			/>
			<SimpleInput
				name="Ссылка на аватар"
				state={newResult}
				setState={setNewResult}
				property="imageSrc"
				type="text"
			/>
			<SimpleSelect
				name="Пол"
				state={newResult}
				setState={setNewResult}
				property="gender"
				type="text"
				options={[
					{ id: 0, name: 'мужской' },
					{ id: 1, name: 'женский' },
				]}
			/>
			<SimpleSelect
				name="Дисквалификация результата"
				state={newResult}
				setState={setNewResult}
				property="DNF"
				type="text"
				options={[
					{ id: 0, name: 'нет' },
					{ id: 1, name: 'да' },
				]}
			/>
			<div className={styles.box__buttons}>
				<Button getClick={goBack}>назад</Button>
				<Button getClick={saveResult}>Сохранить</Button>
			</div>
		</form>
	);
};

export default FormRiderResult;
