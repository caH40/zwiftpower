import React from 'react';
import SimpleCheckbox from '../SimpleCheckbox/SimpleCheckbox';
import SimpleInput from '../SimpleInput/SimpleInput';
import cls from './FormEditSeries.module.css';

const FormEditSeries = ({ series, setSeries }) => {
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
			<SimpleInput
				name="Тип серии"
				state={series}
				setState={setSeries}
				property="type"
				type="text"
			/>
			<SimpleInput
				name="Организатор"
				state={series}
				setState={setSeries}
				property="organizer"
				type="text"
			/>
			<div className="block__checkbox">
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
		</form>
	);
};

export default FormEditSeries;
