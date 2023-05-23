import React from 'react';

import { getAgeCategory, getWeightStr } from '../../utils/event';
import LogoRider from '../LogoRider/LogoRider';

import styles from './ProfileBlock.module.css';

function ProfileBlock({ results, profile }) {
  if (!results.length) return null;
  const [{ profileData }] = results;

  return (
    <div className={styles.wrapper}>
      <div className={styles.bio}>{profile?.bio}</div>
      <div className={styles.params}>
        <div className={styles.box__img}>
          <LogoRider
            source={profileData.imageSrc}
            firstName={profileData.firstName}
            lastName={profileData.lastName}
          />
        </div>
        <dl className={styles.list}>
          <div className={styles.box__term}>
            <dt className={styles.term}>РАЙДЕР</dt>
            <dd
              className={styles.term__description}
            >{`${profileData.firstName} ${profileData.lastName}`}</dd>
          </div>

          <div className={styles.box__term}>
            <dt className={styles.term}>КОМАНДА</dt>
            <dd className={styles.term__description}>{profile?.team}</dd>
          </div>

          <div className={styles.box__term}>
            <dt className={styles.term}>FTP</dt>
            <dd className={styles.term__description}>{profile?.ftp}</dd>
          </div>

          <div className={styles.box__term}>
            <dt className={styles.term}>ВЕС</dt>
            <dd className={styles.term__description}>
              {getWeightStr(profileData.weightInGrams.value)}
              {'кг'}
            </dd>
          </div>

          <div className={styles.box__term}>
            <dt className={styles.term}>ВОЗРАСТ</dt>
            <dd className={styles.term__description}>{getAgeCategory(profileData.age)}</dd>
          </div>

          {/* <div className={styles.box__term}>
            <dt className={styles.term}>ZWIFTID</dt>
            <dd className={styles.term__description}>{results[0]?.profileId}</dd>
          </div> */}

          <div className={styles.box__term}>
            <dt className={styles.term}>ЗАЕЗДОВ</dt>
            <dd className={styles.term__description}>{results?.length}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default ProfileBlock;
