import React, { useState } from 'react';
import { Transition } from 'react-transition-group';

import ListMenuMain from '../ListMenuSideLeft/ListMenuMain';
import ListMenuAdmin from '../ListMenuSideLeft/ListMenuAdmin';

import styles from './NavBarSideLeft.module.css';

function NavBarSideLeft() {
  const [isVisible, setIsVisible] = useState(false);

  const openMenu = () => setIsVisible(true);
  const closeMenu = () => setIsVisible(false);

  return (
    <Transition in={isVisible} timeout={100}>
      {(state) => (
        <nav
          className={`${styles.nav} ${styles[state]}`}
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
        >
          <ListMenuMain state={state} />
          <ListMenuAdmin state={state} />
        </nav>
      )}
    </Transition>
  );
}

export default NavBarSideLeft;
