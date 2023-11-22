import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setZwiftId } from '../../../redux/features/api/zwiftProfiles/zwiftProfileSlice';
import LogoRider from '../../LogoRider/LogoRider';
import Button from '../Button/Button';
import RSimpleInput from '../ReduxUI/RInput/RSimpleInput';
import { fetchZwiftProfile } from '../../../redux/features/api/zwiftProfiles/fetchZwiftProfile';
import SimpleCheckbox from '../SimpleCheckbox/SimpleCheckbox';

import styles from './FindZwiftProfile.module.css';

/**
 *
 * @param {boolean} showAdditionalCheckbox сделать заблокированным checkout дополнительного профиля
 * @param {boolean} hideAdditionalBlock скрыть блок отметки дополнительного профиля
 * @param {function} saveZwiftId функция обработки полученного ZwiftId
 * @returns
 */
function FindZwiftProfileNew({ showAdditionalCheckbox, hideAdditionalBlock, saveZwiftId }) {
  const [form, setForm] = useState({ isAdditional: false });
  const dispatch = useDispatch();

  const { zwiftId, profile } = useSelector((state) => state.getZwiftProfile);

  const findRider = () => {
    dispatch(fetchZwiftProfile(zwiftId));
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
            {!hideAdditionalBlock && (
              <SimpleCheckbox
                state={form}
                setState={setForm}
                property={'isAdditional'}
                title={'Дополнительный профиль'}
                tooltip={'Привязать как дополнительный (неосновной) профиль из Звифта'}
                disabled={!showAdditionalCheckbox}
              />
            )}
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

export default FindZwiftProfileNew;
