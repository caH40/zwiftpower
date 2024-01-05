import { getWeightStr } from '../../utils/event';
import LogoRider from '../LogoRider/LogoRider';
import MyTooltip from '../../HOC/MyTooltip';
import { getAgeCategory } from '../../utils/age';
import CategoryOnlyBox from '../CategoryOnlyBox/CategoryOnlyBox';

import styles from './ProfileBlock.module.css';

function ProfileBlock({ quantityRace, profile }) {
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

          {profile.zCategory && (
            <div className={styles.box__term}>
              <MyTooltip tooltip={'Категория, присвоенная Звифтом '}>
                <dt className={styles.term}>z-Категория</dt>
              </MyTooltip>
              <dd className={styles.term__description}>
                <div className={styles.flex}>
                  {profile.male ? (
                    <CategoryOnlyBox label={profile.zCategory} squareSize={18} />
                  ) : (
                    <>
                      <CategoryOnlyBox
                        label={profile.zCategoryWomen}
                        squareSize={18}
                        female={true}
                        tooltip={'Женская категория'}
                      />
                      <CategoryOnlyBox label={profile.zCategory} squareSize={18} />
                    </>
                  )}
                </div>
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
