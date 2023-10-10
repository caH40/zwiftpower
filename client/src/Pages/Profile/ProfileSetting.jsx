import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import { fetchZwiftId } from '../../redux/features/api/zwift_id/fetchZwiftId';
import LogoRider from '../../components/LogoRider/LogoRider';
import RSimpleInput from '../../components/UI/ReduxUI/RInput/RSimpleInput';
import {
  resetProfileZwift,
  resetZwiftId,
  setZwiftId,
} from '../../redux/features/api/zwift_id/zwiftIdSlice';
import { fetchUserPut } from '../../redux/features/api/user/fetchUser';

import styles from './Profile.module.css';

function ProfileSetting() {
  const { zwiftId, profile } = useSelector((state) => state.getZwiftId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(fetchUserPut(profile.id));
    dispatch(resetProfileZwift());
    navigate(`/profile/${zwiftId}/settings`);
  };

  return (
    <section className={styles.wrapper}>
      <span>Привязать Zwift Id к профилю пользователя</span>
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
