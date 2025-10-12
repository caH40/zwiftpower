import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../../hook/useTitle';
import { fetchZwiftProfiles } from '../../../redux/features/api/zwiftProfiles/fetchZwiftProfile';
import {
  resetZwiftId,
  resetZwiftProfile,
} from '../../../redux/features/api/zwiftProfiles/zwiftProfileSlice';
import { resetZwiftProfiles } from '../../../redux/features/api/zwiftProfiles/zwiftProfilesSliceSlice';
import ProfileBlockZwift from '../../../components/ProfileBlock/ProfileBlockZwift';
import FindZwiftProfile from '../../../components/UI/FindZwiftProfile/FindZwiftProfile';

import styles from './SettingsZwift.module.css';

/**
 * Страница привязки основного и дополнительных аккаунтов из Звифта к аккаунту сайта.
 */
export default function SettingsZwift() {
  useTitle('Привязка аккаунтов из Zwift');
  const { zwiftProfiles, status: zwiftProfilesStatus } = useSelector(
    (state) => state.zwiftProfiles
  );
  const { zwiftId: zwiftIdAuth } = useSelector((state) => state.checkAuth.value.user);

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

      {zwiftProfilesStatus === 'loading' && <div className={styles.loading}>Loading...</div>}

      {zwiftProfiles?.zwiftProfileMain && (
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
