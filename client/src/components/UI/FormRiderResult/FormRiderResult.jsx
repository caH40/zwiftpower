import React from 'react';
import Button from '../Button/Button';
import SimpleInput from '../SimpleInput/SimpleInput';

const FormRiderResult = ({ newResult, setNewResult, goBack }) => {
	return (
		<form>
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
				property="weightInGrams"
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
				name="Ватты/кг"
				state={newResult}
				setState={setNewResult}
				property="wattPerKg"
				type="text"
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
			<SimpleInput
				name="Категория"
				state={newResult}
				setState={setNewResult}
				property="category"
				type="text"
			/>
			<SimpleInput
				name="Категория по результату текущего заезда"
				state={newResult}
				setState={setNewResult}
				property="categoryCurrent"
				type="text"
			/>
			<SimpleInput
				name="Ссылка на аватар"
				state={newResult}
				setState={setNewResult}
				property="imageSrc"
				type="text"
			/>
			<SimpleInput
				name="Пол"
				state={newResult}
				setState={setNewResult}
				property="gender"
				type="text"
			/>
			<SimpleInput
				name="Дисквалификация результата"
				state={newResult}
				setState={setNewResult}
				property="DNF"
				type="text"
			/>
			<Button getClick={goBack} addCls="mb30">
				назад
			</Button>
		</form>
	);
};

export default FormRiderResult;
