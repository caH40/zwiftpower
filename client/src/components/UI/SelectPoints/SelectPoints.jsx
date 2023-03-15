import React from 'react';
import { useDispatch } from 'react-redux';
import { postPoints } from '../../../api/points';

import { getAlert } from '../../../redux/features/alertMessageSlice';
import { backgroundColorSM } from '../../Tables/utils/color';
import { sprintTable } from '../../Tables/utils/pointsTable';

const SelectPoints = ({ pointsType, sequenceNumber, result, setUpdate, multiplier }) => {
	const dispatch = useDispatch();

	const changePlace = e => {
		setUpdate(prev => !prev);
		const place = e.target.value;
		postPoints(pointsType, sequenceNumber, place, result._id, multiplier).then(data =>
			dispatch(getAlert({ message: data.message, type: data.type, isOpened: true }))
		);
	};

	return (
		<select
			style={{
				backgroundColor: backgroundColorSM(pointsType, result, sequenceNumber),
			}}
			onChange={changePlace}
			size="1"
			defaultValue={result[pointsType][sequenceNumber - 1]?.place}
		>
			{sprintTable.map(elm => {
				return <option value={elm.place} label={elm.place} key={elm.place} />;
			})}
		</select>
	);
};

export default SelectPoints;
