import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closePopupForm, fetchPostInfoDev } from '../../../redux/features/api/popupFormSlice';
import ButtonClose from '../ButtonClose/ButtonClose';
import SimpleInput from '../SimpleInput/SimpleInput';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';

import styles from './PopupInfoDev.module.css';

const clearData = { releaseDate: Date.now(), description: '', version: '' };

function PopupInfoDev() {
  const [form, setForm] = useState(clearData);
  const { isVisible } = useSelector((state) => state.popupForm);
  const dispatch = useDispatch();

  const getClick = () => {
    dispatch(fetchPostInfoDev(form));
    setForm(clearData);
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
