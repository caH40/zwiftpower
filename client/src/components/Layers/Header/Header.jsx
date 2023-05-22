import React from 'react';
import { useSelector } from 'react-redux';

import Hamburger from '../../UI/Hamburger/Hamburger';
import NavBar from '../../UI/NavBar/NavBar';
import PopupMenu from '../../UI/PopupMenu/PopupMenu';
import LoaderZ from '../../LoaderZ/LoaderZ';
import useLoader from '../../../hook/useLoader';

import styles from './Header.module.css';

function Header() {
  const titlePage = useSelector((state) => state.titlePage.value.title);
  const { isVisible } = useSelector((state) => state.menuBurger);
  const { isLoading } = useLoader();
  const { user } = useSelector((state) => state.checkAuth.value);

  const isModerator = ['admin', 'moderator'].includes(user.role);

  return (
    <header className={styles.header}>
      {isVisible ? <PopupMenu /> : ''}
      <div className={styles.title__box}>
        <LoaderZ isLoading={isLoading} />
        <h1 className={styles.title}>{titlePage}</h1>
      </div>
      <div className={styles.header__right}>
        <NavBar />
        {isModerator && <Hamburger />}
      </div>
    </header>
  );
}

export default Header;
