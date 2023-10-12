import { useDispatch } from 'react-redux';

import { fetchUserDeleteZwiftId } from '../../redux/features/api/user/fetchUser';
import Flag from '../Flag/Flag';
import LogoRider from '../LogoRider/LogoRider';
import IconDelete from '../icons/IconDelete';

import styles from './ProfileBlock.module.css';

function ProfileBlockZwift({ zwiftProfile, title, removable }) {
  const dispatch = useDispatch();
  const gender = zwiftProfile.male ? 'мужской' : 'женский';

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      {removable && (
        <div
          className={styles.remove}
          onClick={() => dispatch(fetchUserDeleteZwiftId(zwiftProfile.id))}
        >
          <IconDelete tooltip={'Отвязать Zwift Id от аккаунта'} />
        </div>
      )}

      <div className={styles.params}>
        <div className={styles.box__img}>
          <LogoRider
            source={zwiftProfile.imageSrc}
            firstName={zwiftProfile.firstName}
            lastName={zwiftProfile?.lastName}
          />
        </div>
        <dl className={styles.list}>
          <div className={styles.box__term}>
            <dt className={styles.term}>РАЙДЕР</dt>
            <dd
              className={styles.term__description}
            >{`${zwiftProfile.firstName} ${zwiftProfile?.lastName}`}</dd>
          </div>

          <div className={styles.box__term}>
            <dt className={styles.term}>Пол</dt>
            <dd className={styles.term__description}>{gender}</dd>
          </div>

          <div className={styles.box__term}>
            <dt className={styles.term}>Страна</dt>
            <dd className={styles.term__description}>
              <div className={styles.country}>
                <Flag name={zwiftProfile?.countryAlpha3} />
              </div>
            </dd>
          </div>

          <div className={styles.box__term}>
            <dt className={styles.term}>Zwift Id</dt>
            <dd className={styles.term__description}>{zwiftProfile.id}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default ProfileBlockZwift;
