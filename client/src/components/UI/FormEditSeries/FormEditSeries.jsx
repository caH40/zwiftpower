import React from 'react';
import Button from '../Button/Button';
import SimpleCheckbox from '../SimpleCheckbox/SimpleCheckbox';
import SimpleInput from '../SimpleInput/SimpleInput';
import SimpleSelect from '../SimpleSelect/SimpleSelect';

import cls from './FormEditSeries.module.css';

const FormEditSeries = ({ series, setSeries, sendForm }) => {
	return (
		<form className={cls.form} name="series">
			<SimpleInput
				name="Название серии"
				state={series}
				setState={setSeries}
				property="name"
				type="text"
			/>
			<SimpleInput
				name="Дата старта"
				state={series}
				setState={setSeries}
				property="dateStart"
				type="number"
			/>
			<SimpleSelect
				name="Тип серии"
				state={series}
				setState={setSeries}
				property="type"
				options={[
					{ name: 'series', id: '1' },
					{ name: 'tour', id: '2' },
				]}
			/>
			<SimpleSelect
				name="Организатор"
				state={series}
				setState={setSeries}
				property="organizer"
				options={[{ name: 'KOM-ON', id: '1' }]}
			/>

			<div className={cls.box__checkbox}>
				<SimpleCheckbox
					state={series}
					setState={setSeries}
					property="hasGeneral"
					title="Генеральный зачёт:"
				/>

				<SimpleCheckbox
					state={series}
					setState={setSeries}
					property="hasTeams"
					title="Командный зачёт:"
				/>

				<SimpleCheckbox
					state={series}
					setState={setSeries}
					property="isFinished"
					title="Серия завершена:"
				/>
			</div>

			<div className={cls.right}>
				<Button getClick={sendForm}>сохранить</Button>
			</div>
		</form>
	);
};

export default FormEditSeries;
