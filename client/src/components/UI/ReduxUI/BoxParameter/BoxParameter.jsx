import React from 'react';
import { useDispatch } from 'react-redux';

import { getPopupInput } from '../../../../redux/features/popupInputSlice';
import IconSample from '../../../icons/IconSample';
import IconPen from '../../../icons/IconPen';

import styles from './BoxParameter.module.css';

function BoxParameter({ title, children, sample, pen, inputParams }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.parameter}>
      <div className={styles.box__title}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.box__icons}>
          {sample && (
            <IconSample
              squareSize={16}
              tooltip={'Применить ко всем группам'}
              getClick={() => console.log('test')}
            />
          )}
          {pen && (
            <IconPen
              squareSize={16}
              tooltip={'Изменить значение'}
              getClick={() => dispatch(getPopupInput({ isVisible: true, inputParams }))}
            />
          )}
        </div>
      </div>
      <p className={styles.value}>{children}</p>
    </div>
  );
}

export default BoxParameter;
