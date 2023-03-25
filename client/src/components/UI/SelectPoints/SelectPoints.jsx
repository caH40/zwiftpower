import React from 'react';
import { useDispatch } from 'react-redux';

import { putPoints } from '../../../api/points';

import { getAlert } from '../../../redux/features/alertMessageSlice';
import { backgroundColorSM } from '../../Tables/utils/color';
import { sprintTable } from '../../Tables/utils/pointsTable';

import styles from './SelectPoints.module.css';

const SelectPoints = ({ pointsType, sequenceNumber, result, setUpdate, multiplier }) => {
  const dispatch = useDispatch();

  const changePlace = (e) => {
    const place = e.target.value;
    putPoints(pointsType, sequenceNumber, place, result._id, multiplier)
      .then((data) => {
        dispatch(getAlert({ message: data.data.message, type: 'success', isOpened: true }));
      })
      .catch((error) => {
        const message = error.response?.data?.message
          ? error.response?.data?.message
          : 'Ошибка при начислении очков!';
        dispatch(getAlert({ message, type: 'error', isOpened: true }));
      })
      .finally(() => setUpdate((prev) => !prev));
  };

  return (
    <select
      style={{
        backgroundColor: backgroundColorSM(pointsType, result, sequenceNumber),
      }}
      onChange={changePlace}
      size="1"
      defaultValue={result[pointsType][sequenceNumber - 1]?.place}
      className={styles.select}
    >
      {sprintTable.map((elm) => {
        return <option value={elm.place} label={elm.place} key={elm.place} />;
      })}
    </select>
  );
};

export default SelectPoints;
