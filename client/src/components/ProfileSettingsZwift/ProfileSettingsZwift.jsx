import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OpenBoxArrow from '../UI/OpenBoxArrow/OpenBoxArrow';
import ProfileBlockZwift from '../ProfileBlock/ProfileBlockZwift';
import { fetchZwiftProfiles } from '../../redux/features/api/zwiftProfiles/fetchZwiftProfile';
import FindZwiftProfile from '../UI/FindZwiftProfile/FindZwiftProfile';
import {
  resetProfileZwift,
  resetZwiftId,
} from '../../redux/features/api/zwiftProfiles/zwiftProfileSlice';
import { resetZwiftProfiles } from '../../redux/features/api/zwiftProfiles/zwiftProfilesSliceSlice';

import styles from './ProfileSettingsZwift.module.css';

/**
 * блок добавления/удаления ZwiftId к аккаунту
 */
function ProfileSettingsZwift({ zwiftIdAuth }) {
  const [isOpened, setIsOpened] = useState(false);

  const { zwiftProfiles } = useSelector((state) => state.zwiftProfiles);
  const dispatch = useDispatch();

  useEffect(() => {
    // при открытии isOpened блока и наличии zwiftId в профиле при авторизации - идет запрос данных
    if (!zwiftIdAuth || !isOpened) {
      return undefined;
    }
    dispatch(fetchZwiftProfiles(zwiftIdAuth));

    return () => {
      dispatch(resetZwiftId());
      dispatch(resetProfileZwift());
      dispatch(resetZwiftProfiles());
    };
  }, [zwiftIdAuth, isOpened]);

  const openDetailed = () => {
    setIsOpened((prev) => !prev);
  };
  return (
    <section className={styles.wrapper}>
      <div className={styles.box__title}>
        <h3 className={styles.title}>Добавление профиля Звифт к аккаунту zwiftpower.ru</h3>
        <div className={styles.box__arrow}>
          <OpenBoxArrow getClick={openDetailed} isOpened={isOpened} />
        </div>
      </div>

      {isOpened && (
        <>
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

          <FindZwiftProfile showAdditionalCheckbox={zwiftIdAuth} />
        </>
      )}
    </section>
  );
}

export default ProfileSettingsZwift;
