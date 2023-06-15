import React from 'react';
import { Link } from 'react-router-dom';

import Flag from '../../Flag/Flag';
import Leader from '../../Leader/Leader';
import Sweeper from '../../Sweeper/Sweeper';

import IconFemale from '../../icons/IconFemale';

import styles from './Td.module.css';

function TdRider({ profile, profileId, showIcons, getLeaders, getSweepers }) {
  return (
    <td className={styles.max__width}>
      <Link className={styles.link} to={`/profile/${profileId}/results`}>
        <div className={styles.rider}>
          {profile.countryAlpha3 ? (
            <div className={styles.box__flag}>
              <Flag name={profile.countryAlpha3} />
            </div>
          ) : (
            <div className={styles.box__flag} />
          )}
          {showIcons.sm && (
            <div className={styles.rider__logo}>
              {profile.imageSrc ? (
                <img className={styles.rider__img} src={profile.imageSrc} alt="Ph" />
              ) : (
                <div className={styles.rider__img__empty}>
                  {profile.firstName.slice(0, 1) + profile.lastName.slice(0, 1)}
                </div>
              )}
            </div>
          )}

          <div className={styles.name}>
            {`${profile.firstName} ${profile.lastName}`}
            {profile.gender === 'FEMALE' && <IconFemale squareSize={15} />}
            <Leader getLeaders={getLeaders} profileId={profileId} />
            <Sweeper getSweepers={getSweepers} profileId={profileId} />
          </div>
        </div>
      </Link>
    </td>
  );
}

export default TdRider;
