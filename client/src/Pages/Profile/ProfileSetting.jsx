import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchZwiftRiders } from '../../redux/features/api/zwift_id/fetchZwiftId';
import {
  resetProfileZwift,
  resetZwiftId,
} from '../../redux/features/api/zwift_id/zwiftIdSlice';
import ProfileBlockZwift from '../../components/ProfileBlock/ProfileBlockZwift';
import FindZwiftProfile from '../../components/UI/FindZwiftProfile/FindZwiftProfile';

import styles from './ProfileSetting.module.css';

function ProfileSetting() {
  const { zwiftId: zwiftIdAuth } = useSelector((state) => state.checkAuth.value.user);
  const { zwiftProfiles } = useSelector((state) => state.zwiftProfiles);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!zwiftIdAuth) {
      return undefined;
    }
    dispatch(fetchZwiftRiders(zwiftIdAuth));
    return () => {
      dispatch(resetZwiftId());
      dispatch(resetProfileZwift());
    };
  }, [zwiftIdAuth]);

  return (
    <section className={styles.wrapper}>
      {zwiftProfiles.zwiftProfileMain && (
        <>
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
        </>
      )}

      <FindZwiftProfile />
    </section>
  );
}

export default ProfileSetting;
