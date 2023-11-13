import { getWeightStr } from '../../utils/event';
import LogoRider from '../LogoRider/LogoRider';
import MyTooltip from '../../HOC/MyTooltip';
import { getAgeCategory } from '../../utils/age';

import styles from './ProfileBlock.module.css';

function ProfileBlock({ results, profile }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bio}>{profile?.bio}</div>
      <div className={styles.params}>
        <div className={styles.box__img}>
          <LogoRider
            source={profile.imageSrc}
            firstName={profile.firstName}
            lastName={profile.lastName}
          />
        </div>
        <dl className={styles.list}>
          <div className={styles.box__term}>
            <dt className={styles.term}>РАЙДЕР</dt>
            <dd
              className={styles.term__description}
            >{`${profile.firstName} ${profile.lastName}`}</dd>
          </div>
          {/* 
          <div className={styles.box__term}>
            <dt className={styles.term}>КОМАНДА</dt>
            <dd className={styles.term__description}>{profile?.team}</dd>
          </div> */}

          <div className={styles.box__term}>
            <dt className={styles.term}>FTP</dt>
            <MyTooltip tooltip={'95% от CP20'} placement={'right'}>
              <dd className={styles.term__description}>{profile?.ftp}</dd>
            </MyTooltip>
          </div>

          <div className={styles.box__term}>
            <dt className={styles.term}>ВЕС</dt>
            <dd className={styles.term__description}>
              {getWeightStr(profile.weightInGrams)}
              {'кг'}
            </dd>
          </div>

          <div className={styles.box__term}>
            <dt className={styles.term}>ВОЗРАСТ</dt>
            <dd className={styles.term__description}>{getAgeCategory(profile.age)}</dd>
          </div>

          <div className={styles.box__term}>
            <dt className={styles.term}>ZWIFTID</dt>
            <dd className={styles.term__description}>{results[0]?.profileId}</dd>
          </div>

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
