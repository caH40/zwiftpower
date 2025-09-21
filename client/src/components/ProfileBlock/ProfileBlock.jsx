import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames/bind';

import { fetchProfileRefresh } from '../../redux/features/api/profileRefreshSlice';
import { fetchUserProfile } from '../../redux/features/api/userProfileSlice';
import { getWeightStr } from '../../utils/event';
import { getAgeCategory } from '../../utils/age';
import LogoRider from '../LogoRider/LogoRider';
import IconEdit from '../icons/IconEdit';
import MyTooltip from '../../HOC/MyTooltip';
import CategoryMF from '../CategoryMF/CategoryMF';
import TeamLogoBox from '../TeamLogoBox/TeamLogoBox';

import styles from './ProfileBlock.module.css';

const cx = cn.bind(styles);

const platformIcons = {
  twitch: '/images/twitch_glitch_flat_purple.svg',
  youtube: '/images/youtube_icon.svg',
};

function ProfileBlock({ quantityRace, profile, enlargeLogo, streamsEnabled }) {
  const { role, zwiftId } = useSelector((state) => state.checkAuth.value.user);
  const { zwiftId: zwiftIdPage } = useParams();

  const isAdmin = ['admin'].includes(role);

  const dispatch = useDispatch();

  const refreshProfile = () => {
    dispatch(fetchProfileRefresh()).then((data) => {
      if (data.meta.requestStatus === 'fulfilled') {
        // Запрос обновленных данных профиля и обновление стора на клиенте.
        dispatch(fetchUserProfile({ zwiftId }));
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.bio}>{profile?.bio}</div>
      <div className={styles.params}>
        <div className={styles.block__img}>
          <div className={styles.box__img}>
            <LogoRider
              source={profile.imageSrc}
              firstName={profile.firstName}
              lastName={profile.lastName}
              enlargeLogo={enlargeLogo}
            />
          </div>

          {/* кнопка запроса на обновление данных аккаунта */}
          {zwiftId == zwiftIdPage && (
            <button onClick={refreshProfile} className={styles.btn}>
              обновить данные
            </button>
          )}

          {/* блок отображение сервисов трансляций которые подключил пользователь */}
          {!!streamsEnabled?.length && (
            <div className={styles.platform}>
              {streamsEnabled.map((stream) => (
                <a href={stream.url} target="_blank" rel="noreferrer" key={stream.platform}>
                  <img
                    src={platformIcons[stream.platform]}
                    alt={'stream platform'}
                    className={styles.icon__platform}
                  />
                </a>
              ))}
            </div>
          )}
        </div>

        <dl className={styles.list}>
          <div className={styles.box__term}>
            <dt className={styles.term}>РАЙДЕР</dt>
            <dd
              className={styles.term__description}
            >{`${profile.firstName} ${profile.lastName}`}</dd>
          </div>

          {/* Команда */}
          {profile.team && (
            <div className={styles.box__term}>
              <dt className={styles.term}>Команда</dt>
              <dd className={styles.term__description}>
                <TeamLogoBox team={profile.team} />
              </dd>
            </div>
          )}

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
            <MyTooltip tooltip={'Гоночные рейтинговые очки'}>
              <dt className={styles.term}>Racing Score</dt>
            </MyTooltip>
            <dd className={styles.term__description}>{profile.racingScore}</dd>
          </div>

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
            <dd className={cx('term__description', 'box__zwiftId')}>
              {profile.zwiftId}
              {isAdmin && (
                <Link to={`/admin/riders/${profile.zwiftId}/main`}>
                  <IconEdit squareSize={20} />
                </Link>
              )}
            </dd>
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
