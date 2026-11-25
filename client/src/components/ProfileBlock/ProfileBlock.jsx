import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames/bind';

import { fetchProfileRefresh } from '../../redux/features/api/profileRefreshSlice';
import { fetchUserProfile } from '../../redux/features/api/userProfileSlice';
import { getWeightStr } from '../../utils/event';
import { getAgeCategory } from '../../utils/age';
import { EXTERNAL_SERVICE_ICONS, EXTERNAL_SERVICE_URLS } from '../../assets/constants';
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

function ProfileBlock({
  quantityRace,
  profile,
  enlargeLogo,
  streamsEnabled,
  externalAccountServices,
}) {
  const {
    role,
    zwiftId,
    externalAccountServices: ownAccountServices,
  } = useSelector((state) => state.checkAuth.value.user);
  const { zwiftId: zwiftIdPage } = useParams();

  const isAdmin = ['admin'].includes(role);

  // Ссылки на дополнительные профили (Strava, Garmin Connect). Приходят в данных профиля райдера,
  // а для своей страницы, если сервер их ещё не отдал, берём из привязанных сервисов аккаунта.
  let accountServices = externalAccountServices || [];

  if (!accountServices.length && zwiftId == zwiftIdPage) {
    accountServices = ownAccountServices || [];
  }

  const externalProfiles = accountServices
    .map((item) => ({
      service: item.service,
      icon: EXTERNAL_SERVICE_ICONS[item.service],
      url: item.accountId
        ? EXTERNAL_SERVICE_URLS[item.service]?.replace(
            '{id}',
            encodeURIComponent(item.accountId)
          )
        : '',
    }))
    .filter((item) => item.icon && item.url);

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

          {/* сервисы трансляций и ссылки на дополнительные профили райдера */}
          {!!(streamsEnabled?.length || externalProfiles.length) && (
            <div className={styles.platform}>
              {streamsEnabled?.map((stream) => (
                <a href={stream.url} target="_blank" rel="noreferrer" key={stream.platform}>
                  <img
                    src={platformIcons[stream.platform]}
                    alt={'stream platform'}
                    className={styles.icon__platform}
                  />
                </a>
              ))}
              {externalProfiles.map((item) => (
                <a href={item.url} target="_blank" rel="noreferrer" key={item.service}>
                  <img
                    src={item.icon}
                    alt={`${item.service} profile`}
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
                <TeamLogoBox
                  team={profile.team}
                  background={profile.team.appearance?.badgeBackground}
                  color={profile.team.appearance?.badgeTextColor}
                />
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
