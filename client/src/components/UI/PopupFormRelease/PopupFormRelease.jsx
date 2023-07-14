import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ButtonClose from '../ButtonClose/ButtonClose';
import Button from '../Button/Button';
import { fetchPostInfoDev } from '../../../redux/features/api/popupInfoDevPostSlice';
import { closePopupForm } from '../../../redux/features/popupFormSlice';
import RInputRelease from '../ReduxUI/RInputRelease/RInputRelease';
import RTextareaRelease from '../ReduxUI/RTextareaRelease/RTextareaRelease';
import { fetchPutInfoDev } from '../../../redux/features/api/popupInfoDevPutSlice';

import styles from './PopupFormRelease.module.css';

function PopupFormRelease() {
  const { isVisible, releaseData, method } = useSelector((state) => state.popupForm);

  const dispatch = useDispatch();

  const getClick = () => {
    if (method === 'post') {
      dispatch(fetchPostInfoDev(releaseData));
    } else {
      dispatch(fetchPutInfoDev(releaseData));
    }

    dispatch(closePopupForm());
  };
  const closePopup = () => dispatch(closePopupForm());

  return (
    <>
      {isVisible && (
        <div className={styles.wrapper} onClick={closePopup}>
          <div className={styles.block} onClick={(e) => e.stopPropagation()}>
            <div className={styles.close}>
              <ButtonClose getClick={closePopup} />
            </div>
            <form className={styles.form}>
              <RInputRelease label={'Дата релиза'} type={'date'} property={'releaseDate'} />
              <RInputRelease
                label={'Версия релиза (x.x.x)'}
                type={'text'}
                property={'version'}
              />
              <RTextareaRelease label={'Описание релиза'} property={'text'} />

              <div className={styles.box__button}>
                <Button getClick={getClick}>Отправить</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupFormRelease;
