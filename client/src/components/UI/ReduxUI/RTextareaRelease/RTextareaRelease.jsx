import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPopupForm } from '../../../../redux/features/popupFormSlice';

import styles from './RTextareaRelease.module.css';

function RTextareaRelease({ label, placeholder, property, disabled }) {
  const releaseData = useSelector((state) => state.popupForm.releaseData);
  const dispatch = useDispatch();

  return (
    <>
      <label className={styles.label}>
        {label || property}
        <textarea
          className={styles.textarea}
          value={releaseData[property]}
          onChange={(e) => {
            dispatch(setPopupForm({ [property]: e.target.value }));
          }}
          disabled={disabled}
        />
      </label>
    </>
  );
}

export default RTextareaRelease;
