import React from 'react';
import Button from '../Button/Button';
import SimpleCheckbox from '../SimpleCheckbox/SimpleCheckbox';
import SimpleInput from '../SimpleInput/SimpleInput';
import SimpleSelect from '../SimpleSelect/SimpleSelect';
import styles from './FormEditStage.module.css';

const FormEditStage = ({ stage, setStage, sendForm }) => {
	return (
		<form className={styles.form} name="series">
			<SimpleInput
				name="ID Этапа"
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
				type="number"
			/>
			<SimpleInput
				name="Дата старта"
				state={stage}
				setState={setStage}
				property="dateStart"
				type="date"
				min="2016-01-01"
				max="2030-01-01"
			/>
			<SimpleInput name="Маршрут" state={stage} setState={setStage} property="route" type="text" />
			<SimpleInput
				name="Ссылка на Звифт"
				state={stage}
				setState={setStage}
				property="link"
				type="text"
			/>
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
				type="number"
			/>
			<SimpleInput
				name="Дистанция, км"
				state={stage}
				setState={setStage}
				property="distance"
				type="number"
			/>
			<SimpleInput
				name="Общий набор, м"
				state={stage}
				setState={setStage}
				property="ascent"
				type="number"
			/>
			<SimpleSelect
				name="Тип этапа"
				state={stage}
				setState={setStage}
				property="type"
				options={[
					{ name: 'mixed', id: '1' },
					{ name: 'TT', id: '2' },
					{ name: 'mountain', id: '3' },
				]}
			/>
			<SimpleInput
				name="Количество спринт-участков"
				state={stage}
				setState={setStage}
				property="quantitySprints"
				type="number"
			/>
			<SimpleInput
				name="Количество горных участков"
				state={stage}
				setState={setStage}
				property="quantityMountains"
				type="number"
			/>
			<div className={styles.box__checkbox}>
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

			<div className={styles.right}>
				<Button getClick={sendForm}>сохранить</Button>
			</div>
		</form>
	);
};

export default FormEditStage;
