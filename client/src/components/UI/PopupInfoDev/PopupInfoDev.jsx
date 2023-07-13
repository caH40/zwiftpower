import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ButtonClose from '../ButtonClose/ButtonClose';
import SimpleInput from '../SimpleInput/SimpleInput';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import { fetchPostInfoDev } from '../../../redux/features/api/popupInfoDevPostSlice';
import { closePopupForm } from '../../../redux/features/popupFormSlice';

import styles from './PopupInfoDev.module.css';

function PopupInfoDev() {
  const { isVisible, releaseData } = useSelector((state) => state.popupForm);

  const [form, setForm] = useState(() => releaseData);
  const dispatch = useDispatch();

  const getClick = () => {
    dispatch(fetchPostInfoDev(form));
    setForm({});
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
              <SimpleInput
                name={'Дата релиза'}
                type={'date'}
                property={'releaseDate'}
                state={form}
                setState={setForm}
              />
              <SimpleInput
                name={'Версия релиза (x.x.x)'}
                type={'text'}
                property={'version'}
                state={form}
                setState={setForm}
              />
              <TextArea
                name={'Описание релиза'}
                property={'text'}
                state={form}
                setState={setForm}
              />
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

export default PopupInfoDev;
