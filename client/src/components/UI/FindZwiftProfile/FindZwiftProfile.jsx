import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  resetZwiftProfile,
  setZwiftId,
} from '../../../redux/features/api/zwiftProfiles/zwiftProfileSlice';
import LogoRider from '../../LogoRider/LogoRider';
import Button from '../Button/Button';
import RSimpleInput from '../ReduxUI/RInput/RSimpleInput';
import { fetchZwiftProfile } from '../../../redux/features/api/zwiftProfiles/fetchZwiftProfile';
import { fetchUserPut } from '../../../redux/features/api/user/fetchUser';
import SimpleCheckbox from '../SimpleCheckbox/SimpleCheckbox';

import styles from './FindZwiftProfile.module.css';

function FindZwiftProfile({ showAdditionalCheckbox }) {
  const [form, setForm] = useState({ isAdditional: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { zwiftId, profile: zwiftProfile } = useSelector((state) => state.getZwiftProfile);

  const findRider = () => {
    dispatch(fetchZwiftProfile(zwiftId));
  };

  const saveZwiftId = () => {
    // Запуск акшена на запрос на привязку основного или дополнительного аккаунта Zwift к профилю на сайте.
    const { isAdditional } = form;

    dispatch(fetchUserPut({ zwiftId: zwiftProfile.id, isAdditional })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        // Переход на страницу с новым привязанным zwiftId, если привязывается основной zwiftId.
        // При привязке дополнительного zwiftId остаемся на той же странице..

        if (!isAdditional) {
          navigate(`/profile/${zwiftId}/settings/zwift`);
        }
      }
    });

    // Сброс из хранилища найденного профиля zwiftId для привязки.
    dispatch(resetZwiftProfile());
  };

  return (
    <form className={styles.block}>
      <span className={styles.label}>Поиск профиля на сервере Zwift, введите ZwiftId:</span>
      <div>
        <RSimpleInput value={zwiftId} name={'Zwift Id'} reducer={setZwiftId} type="number" />
        <Button getClick={findRider}>НАЙТИ</Button>
      </div>

      {zwiftProfile?.id && (
        <>
          <div className={styles.box__checkbox}>
            <SimpleCheckbox
              state={form}
              setState={setForm}
              property={'isAdditional'}
              title={'Дополнительный профиль'}
              tooltip={'Привязать как дополнительный (неосновной) профиль из Звифта'}
              disabled={!showAdditionalCheckbox}
            />
          </div>

          <div className={styles.box__rider}>
            <div className={styles.box__img}>
              <LogoRider
                source={zwiftProfile?.imageSrc}
                firstName={zwiftProfile.firstName}
                lastName={zwiftProfile?.lastName}
              />
            </div>
            <div className={styles.box__name}>
              <span>{zwiftProfile.firstName}</span>
              <span>{zwiftProfile.lastName}</span>
              <div>
                <span>zwiftId:</span>
                <span>{zwiftProfile.id}</span>
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
