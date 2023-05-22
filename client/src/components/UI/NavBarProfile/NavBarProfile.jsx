import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import ButtonForFilter from '../Filters/ButtonForFilter/ButtonForFilter';
import { setProfilePage } from '../../../redux/features/menuProfileSlice';
import { profileButtons, quantityButtons } from '../../../asset/profile-buttons';

import styles from './NavBarProfile.module.css';

function NavBarProfile() {
  const { menuProfileState } = useSelector((state) => state.menuProfile);

  return (
    <div className={styles.box}>
      {profileButtons.map((button, index) => (
        <ButtonForFilter
          key={button.id}
          position={cn({
            left: index === 0,
            center: index !== 0 && quantityButtons > 2 && index + 1 !== quantityButtons,
            right: index !== 0 && index + 1 === quantityButtons,
          })}
          active={menuProfileState.name === button.name}
          reducer={setProfilePage}
        >
          {button.name}
        </ButtonForFilter>
      ))}
    </div>
  );
}

export default NavBarProfile;
