import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  resetProfileZwift,
  setZwiftId,
} from '../../../redux/features/api/zwiftProfiles/zwiftProfileSlice';
import LogoRider from '../../LogoRider/LogoRider';
import Button from '../Button/Button';
import RSimpleInput from '../ReduxUI/RInput/RSimpleInput';
import { fetchZwiftProfile } from '../../../redux/features/api/zwiftProfiles/fetchZwiftProfile';
import { fetchUserPut } from '../../../redux/features/api/user/fetchUser';
import SimpleCheckbox from '../SimpleCheckbox/SimpleCheckbox';

import styles from './FindZwiftProfile.module.css';

function FindZwiftProfile() {
  const [form, setForm] = useState({ isAdditional: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { zwiftId, profile } = useSelector((state) => state.getZwiftProfile);

  const findRider = () => {
    dispatch(fetchZwiftProfile(zwiftId));
  };

  const saveZwiftId = () => {
    dispatch(fetchUserPut({ zwiftId: profile.id, isAdditional: form.isAdditional }));
    dispatch(resetProfileZwift());
    navigate(`/profile/${zwiftId}/settings`);
  };

  return (
    <form className={styles.block}>
      <span className={styles.label}>Поиск профиля на сервере Zwift, введите ZwiftId:</span>
      <div>
        <RSimpleInput value={zwiftId} name={'Zwift Id'} reducer={setZwiftId} type="number" />
        <Button getClick={findRider}>НАЙТИ</Button>
      </div>

      {profile?.id && (
        <>
          <div className={styles.box__checkbox}>
            <SimpleCheckbox
              state={form}
              setState={setForm}
              property={'isAdditional'}
              title={'Дополнительный профиль'}
              tooltip={'Привязать как дополнительный (неосновной) профиль из Звифта'}
            />
          </div>
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
  );
}

export default FindZwiftProfile;
