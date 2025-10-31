import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import Flag from '../../Flag/Flag';
import Leader from '../../Leader/Leader';
import Sweeper from '../../Sweeper/Sweeper';

import IconFemale from '../../icons/IconFemale';

import styles from './Td.module.css';

const cx = classNames.bind(styles);

function TdRider({ profile, profileId, getLeaders, getSweepers }) {
  const riderName = `${profile.firstName} ${profile.lastName}`;
  return (
    <td>
      <Link className={cx('link')} to={`/profile/${profileId}/results`}>
        <div className={cx('rider')}>
          {profile.countryAlpha3 ? (
            <div className={cx('box__flag')}>
              <Flag name={profile.countryAlpha3} />
            </div>
          ) : (
            <div className={cx('box__flag')} />
          )}

          <div className={cx('rider__logo')}>
            {profile.imageSrc ? (
              <img
                className={cx('rider__img')}
                src={profile.imageSrc}
                loading="lazy"
                alt={`${riderName}'s rider logo`}
              />
            ) : (
              <div className={cx('rider__img__empty')}>
                {profile.firstName.slice(0, 1) + profile.lastName.slice(0, 1)}
              </div>
            )}
          </div>

          <div className={cx('name')}>
            <span>
              {riderName}
              <span className={cx('female')}>
                {profile.gender === 'FEMALE' && <IconFemale squareSize={15} />}
              </span>
            </span>
            {getLeaders && <Leader getLeaders={getLeaders} profileId={profileId} />}
            {getSweepers && <Sweeper getSweepers={getSweepers} profileId={profileId} />}
          </div>
        </div>
      </Link>
    </td>
  );
}

export default TdRider;
