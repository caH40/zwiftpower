import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import SimpleInput from '../../components/UI/SimpleInput/SimpleInput';
import Button from '../../components/UI/Button/Button';
import { getZwiftRider } from '../../api/zwift/rider';
import LogoRider from '../../components/LogoRider/LogoRider';
import { updateZwiftId } from '../../api/user';
import { checkAuth } from '../../api/auth-check';
import { getAuth } from '../../redux/features/authSlice';
import { getAlert } from '../../redux/features/alertMessageSlice';

import styles from './Profile.module.css';

function ProfileSetting() {
  const [form, setForm] = useState({ zwiftId: 0 });
  const [rider, setRider] = useState({});
  const dispatch = useDispatch();

  const findRider = () => {
    getZwiftRider(form.zwiftId).then((response) => setRider(response.data));
  };

  const saveZwiftId = () => {
    updateZwiftId(form.zwiftId)
      .then((response) => {
        // обновление данный юзера после обновления zwiftId
        checkAuth()
          .then((response) => {
            if (!response) return;
            dispatch(getAuth({ status: true, user: response.data.user }));
            localStorage.setItem('accessToken', response.data.accessToken);
          })
          .catch((error) => {
            dispatch(getAuth({ status: false, user: {} }));
            localStorage.setItem('accessToken', '');
          });

        setForm({ zwiftId: 0 });
        setRider({});
        dispatch(getAlert({ message: response.data.message, type: 'success', isOpened: true }));
      })
      .catch((error) => {
        dispatch(
          getAlert({ message: error.response.data.message, type: 'error', isOpened: true })
        );
      });
  };

  return (
    <section className={styles.wrapper}>
      <form className={styles.block__zwiftId}>
        <div className={styles.box__zwiftId}>
          <SimpleInput
            name={'Zwift Id'}
            state={form}
            setState={setForm}
            property="zwiftId"
            type="number"
          />
          <Button getClick={findRider}>НАЙТИ</Button>
        </div>

        {rider.id && (
          <>
            <div className={styles.box__rider}>
              <div className={styles.box__img}>
                <LogoRider
                  source={rider.imageSrc}
                  firstName={rider.firstName}
                  lastName={rider.lastName}
                />
              </div>
              <div className={styles.box__name}>
                <span>{rider.firstName}</span>
                <span>{rider.lastName}</span>
              </div>
            </div>
            <Button getClick={saveZwiftId}>СОХРАНИТЬ</Button>
          </>
        )}
      </form>
    </section>
  );
}

export default ProfileSetting;
