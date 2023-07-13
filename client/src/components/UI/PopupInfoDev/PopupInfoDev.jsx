import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closePopupForm, fetchInfoDev } from '../../../redux/features/popupFormSlice';
import ButtonClose from '../ButtonClose/ButtonClose';
import SimpleInput from '../SimpleInput/SimpleInput';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';

import styles from './PopupInfoDev.module.css';

function PopupInfoDev() {
  const [form, setForm] = useState({ releaseDate: Date.now(), description: '', version: '' });
  const { isVisible } = useSelector((state) => state.popupForm);
  const dispatch = useDispatch();

  const getClick = () => {
    dispatch(fetchInfoDev(form));
    // dispatch(closePopupForm());
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
                property={'description'}
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
