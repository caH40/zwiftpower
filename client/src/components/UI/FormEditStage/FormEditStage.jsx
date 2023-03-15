import React from 'react';
import SimpleCheckbox from '../SimpleCheckbox/SimpleCheckbox';
import SimpleInput from '../SimpleInput/SimpleInput';
import cls from './FormEditStage.module.css';

const FormEditStage = ({ stage, setStage }) => {
	return (
		<form className={cls.form} name="series">
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
			<SimpleInput
				name="Тип этапа"
				state={stage}
				setState={setStage}
				property="type"
				type="text"
			/>
			<div className="block__checkbox">
				<SimpleCheckbox
					state={stage}
					setState={setStage}
					property="needCount"
					title="Необходимо учитывать в генерале:"
				/>
			</div>
		</form>
	);
};

// hasResults: false;
// quantityMountains: 1;
// quantitySprints: 1;

export default FormEditStage;
