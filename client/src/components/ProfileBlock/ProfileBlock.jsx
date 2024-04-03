import { getWeightStr } from '../../utils/event';
import LogoRider from '../LogoRider/LogoRider';
import MyTooltip from '../../HOC/MyTooltip';
import { getAgeCategory } from '../../utils/age';
import CategoryMF from '../CategoryMF/CategoryMF';

import styles from './ProfileBlock.module.css';

function ProfileBlock({ quantityRace, profile, enlargeLogo }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bio}>{profile?.bio}</div>
      <div className={styles.params}>
        <div className={styles.box__img}>
          <LogoRider
            source={profile.imageSrc}
            firstName={profile.firstName}
            lastName={profile.lastName}
            enlargeLogo={enlargeLogo}
          />
        </div>
        <dl className={styles.list}>
          <div className={styles.box__term}>
            <dt className={styles.term}>РАЙДЕР</dt>
            <dd
              className={styles.term__description}
            >{`${profile.firstName} ${profile.lastName}`}</dd>
          </div>

          {profile.zCategory && (
            <div className={styles.box__term}>
              <MyTooltip tooltip={'Категория, присвоенная Звифтом '}>
                <dt className={styles.term}>z-Категория</dt>
              </MyTooltip>
              <dd className={styles.term__description}>
                <CategoryMF
                  male={profile.male}
                  category={profile.zCategory}
                  categoryWomen={profile.zCategoryWomen}
                  squareSize={18}
                />
              </dd>
            </div>
          )}

          <div className={styles.box__term}>
            <dt className={styles.term}>ВЕС</dt>
            <dd className={styles.term__description}>
              {getWeightStr(profile.weight)}
              {'кг'}
            </dd>
          </div>

          <div className={styles.box__term}>
            <dt className={styles.term}>ВОЗРАСТ</dt>
            <dd className={styles.term__description}>{getAgeCategory(profile.age)}</dd>
          </div>

          <div className={styles.box__term}>
            <dt className={styles.term}>ZWIFTID</dt>
            <dd className={styles.term__description}>{profile.zwiftId}</dd>
          </div>

          <div className={styles.box__term}>
            <dt className={styles.term}>ЗАЕЗДОВ</dt>
            <dd className={styles.term__description}>{quantityRace}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default ProfileBlock;
