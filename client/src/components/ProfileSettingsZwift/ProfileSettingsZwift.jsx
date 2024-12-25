import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProfileBlockZwift from '../ProfileBlock/ProfileBlockZwift';
import { fetchZwiftProfiles } from '../../redux/features/api/zwiftProfiles/fetchZwiftProfile';
import FindZwiftProfile from '../UI/FindZwiftProfile/FindZwiftProfile';
import {
  resetZwiftProfile,
  resetZwiftId,
} from '../../redux/features/api/zwiftProfiles/zwiftProfileSlice';
import { resetZwiftProfiles } from '../../redux/features/api/zwiftProfiles/zwiftProfilesSliceSlice';

import styles from './ProfileSettingsZwift.module.css';

/**
 * блок добавления/удаления ZwiftId к аккаунту
 */
function ProfileSettingsZwift({ zwiftIdAuth }) {
  const { zwiftProfiles } = useSelector((state) => state.zwiftProfiles);
  const dispatch = useDispatch();

  // Запрос данных по уже привязанным аккаунтам из Звифта.
  useEffect(() => {
    if (!zwiftIdAuth) {
      return undefined;
    }
    dispatch(fetchZwiftProfiles(zwiftIdAuth));

    return () => {
      dispatch(resetZwiftId());
      dispatch(resetZwiftProfile());
      dispatch(resetZwiftProfiles());
    };
  }, [zwiftIdAuth]);

  return (
    <section className={styles.wrapper}>
      <h3 className={styles.title}>Привязанные профили из Звифта к аккаунту zwiftpower.ru</h3>

      {zwiftProfiles.zwiftProfileMain && (
        <div className={styles.wrapper__cards}>
          <ProfileBlockZwift
            zwiftProfile={zwiftProfiles.zwiftProfileMain}
            title={'Основной аккаунт из Звифта (ZwiftId)'}
          />

          {zwiftProfiles.zwiftProfilesAdditional.map((zwiftProfile) => (
            <div className={styles.block} key={zwiftProfile.id}>
              <ProfileBlockZwift
                zwiftProfile={zwiftProfile}
                title={'Дополнительный аккаунт из Звифта (ZwiftId)'}
                removable={true}
              />
            </div>
          ))}
        </div>
      )}

      <FindZwiftProfile showAdditionalCheckbox={zwiftIdAuth} />
    </section>
  );
}

export default ProfileSettingsZwift;
