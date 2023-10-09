import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import { fetchZwiftId } from '../../redux/features/api/zwift_id/fetchZwiftId';
import LogoRider from '../../components/LogoRider/LogoRider';
import { updateZwiftId } from '../../api/user';
import { checkAuth } from '../../api/auth-check';
import { getAuth } from '../../redux/features/authSlice';
import { getAlert } from '../../redux/features/alertMessageSlice';
import RSimpleInput from '../../components/UI/ReduxUI/RInput/RSimpleInput';
import {
  resetProfileZwift,
  resetZwiftId,
  setZwiftId,
} from '../../redux/features/api/zwift_id/zwiftIdSlice';

import styles from './Profile.module.css';

function ProfileSetting() {
  const { zwiftId, profile } = useSelector((state) => state.getZwiftId);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetZwiftId());
      dispatch(resetProfileZwift());
    };
  }, []);

  const findRider = () => {
    dispatch(fetchZwiftId(zwiftId));
  };

  const saveZwiftId = () => {
    updateZwiftId(zwiftId)
      .then((response) => {
        // обновление данных юзера в БД после обновления zwiftId
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
      <span>Добавление Zwift Id в профиль пользователя</span>
      <form className={styles.block__zwiftId}>
        <div className={styles.box__zwiftId}>
          <RSimpleInput value={zwiftId} name={'Zwift Id'} reducer={setZwiftId} type="number" />
          <Button getClick={findRider}>НАЙТИ</Button>
        </div>

        {profile.id && (
          <>
            <div className={styles.box__rider}>
              <div className={styles.box__img}>
                <LogoRider
                  source={profile?.imageSrc}
                  firstName={profile.firstName}
                  lastName={profile?.lastName}
                />
              </div>
              <div className={styles.box__name}>
                <span>{profile.firstName}</span>
                <span>{profile.lastName}</span>
                <div>
                  <span>zwiftId:</span>
                  <span>{profile.id}</span>
                </div>
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
