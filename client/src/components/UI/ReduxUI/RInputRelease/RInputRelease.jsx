import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPopupForm } from '../../../../redux/features/popupFormSlice';
import { handlerNewValue, handlerValue } from '../../SimpleInput/service';

import styles from './RInputRelease.module.css';

function RInputRelease({ label, type, property, disabled }) {
  const releaseData = useSelector((state) => state.popupForm.releaseData);
  const dispatch = useDispatch();

  return (
    <>
      <label className={styles.label}>
        {label || property}
        <input
          className={styles.input}
          type={type}
          value={handlerValue(type, releaseData[property])} // обработка инпута типа "Дата"
          onChange={(e) => {
            dispatch(setPopupForm({ [property]: handlerNewValue(type, e) }));
          }}
          disabled={disabled}
        />
      </label>
    </>
  );
}

export default RInputRelease;
