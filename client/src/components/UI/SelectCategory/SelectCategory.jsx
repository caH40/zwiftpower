import React from 'react';
import { useDispatch } from 'react-redux';
import { putCategory } from '../../../api/category';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import cls from './SelectCategory.module.css';

const SelectCategory = ({ value, zwiftId, stageId, setUpdate }) => {
	const dispatch = useDispatch();

	const changeCategory = e => {
		const newCategory = e.target.value;
		putCategory(newCategory, zwiftId, stageId)
			.then(data => {
				dispatch(getAlert({ message: data.data.message, type: 'success', isOpened: true }));
				setUpdate(prev => !prev);
			})
			.catch(error =>
				dispatch(
					getAlert({ message: 'Ошибка при изменении категории!', type: 'error', isOpened: true })
				)
			);
	};

	return (
		<div>
			<select
				onChange={changeCategory}
				name="category"
				size="1"
				value={value}
				className={`${cls.select} ${cls[`color__${value}`]}`}
			>
				<option className={cls.color__A} value="A" label="A" />
				<option className={cls.color__B} value="B" label="B" />
				<option className={cls.color__C} value="C" label="C" />
				<option className={cls.color__W} value="W" label="W" />
				<option className={cls.color__W} value="WA" label="WA" />
				<option className={cls.color__W} value="WB" label="WB" />
			</select>
		</div>
	);
};

export default SelectCategory;
