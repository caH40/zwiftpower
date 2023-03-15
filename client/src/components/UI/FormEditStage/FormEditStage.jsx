import React from 'react';
import Button from '../Button/Button';
import SimpleCheckbox from '../SimpleCheckbox/SimpleCheckbox';
import SimpleInput from '../SimpleInput/SimpleInput';
import SimpleSelect from '../SimpleSelect/SimpleSelect';
import cls from './FormEditStage.module.css';

const FormEditStage = ({ stage, setStage, sendForm }) => {
	return (
		<form className={cls.form} name="series">
			<SimpleInput
				name="Номер Этапа"
				state={stage}
				setState={setStage}
				property="_id"
				type="text"
				disabled={true}
			/>
			<SimpleInput
				name="Номер Этапа"
				state={stage}
				setState={setStage}
				property="number"
				type="text"
			/>
			<SimpleInput
				name="Дата старта"
				state={stage}
				setState={setStage}
				property="dateStart"
				type="text"
			/>
			<SimpleInput name="Маршрут" state={stage} setState={setStage} property="route" type="text" />
			<SimpleInput
				name="Ссылка на маршрут"
				state={stage}
				setState={setStage}
				property="routeLink"
				type="text"
			/>
			<SimpleInput name="Мир" state={stage} setState={setStage} property="world" type="text" />
			<SimpleInput
				name="Количество кругов"
				state={stage}
				setState={setStage}
				property="laps"
				type="text"
			/>
			<SimpleInput
				name="Дистанция, км"
				state={stage}
				setState={setStage}
				property="distance"
				type="text"
			/>
			<SimpleInput
				name="Общий набор, м"
				state={stage}
				setState={setStage}
				property="ascent"
				type="text"
			/>
			<SimpleSelect name="Тип этапа" state={stage} setState={setStage} property="type" />

			<SimpleInput
				name="Количество спринт-участков"
				state={stage}
				setState={setStage}
				property="quantitySprints"
				type="text"
			/>
			<SimpleInput
				name="Количество горных участков"
				state={stage}
				setState={setStage}
				property="quantityMountains"
				type="text"
			/>
			<div className={cls.box__checkbox}>
				<SimpleCheckbox
					state={stage}
					setState={setStage}
					property="needCount"
					title="Необходимо учитывать в генерале:"
				/>
				<SimpleCheckbox
					state={stage}
					setState={setStage}
					property="hasResults"
					title="Добавлены результаты этапа"
					disabled={true}
				/>
			</div>

			<div className={cls.right}>
				<Button getClick={sendForm}>сохранить</Button>
			</div>
		</form>
	);
};

export default FormEditStage;
