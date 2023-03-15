import React from 'react';
import { useDispatch } from 'react-redux';
import { postCategory } from '../../../api/category';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import cls from './SelectCategory.module.css';

const SelectCategory = ({ defaultValue, zwiftId, stageId, setUpdate }) => {
	const dispatch = useDispatch();

	const color = {
		A: '#dc4119',
		B: '#58c34e',
		C: '#3ec0e9',
		W: '#9422ae',
		WA: '#9422ae',
		WB: '#9422ae',
	};

	const changeCategory = e => {
		const newCategory = e.target.value;
		setUpdate(prev => !prev);
		postCategory(newCategory, zwiftId, stageId).then(data =>
			dispatch(getAlert({ message: data.message, type: data.type, isOpened: true }))
		);
	};

	return (
		<div>
			<select
				onChange={changeCategory}
				name="category"
				size="1"
				defaultValue={defaultValue}
				className={cls.category}
				style={{ backgroundColor: color[defaultValue] }}
			>
				<option style={{ background: color.A }} value="A" label="A" />
				<option style={{ background: color.B }} value="B" label="B" />
				<option style={{ background: color.C }} value="C" label="C" />
				<option style={{ background: color.W }} value="W" label="W" />
				<option style={{ background: color.W }} value="WA" label="WA" />
				<option style={{ background: color.W }} value="WB" label="WB" />
			</select>
		</div>
	);
};

export default SelectCategory;
