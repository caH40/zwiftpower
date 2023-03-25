import React from 'react';
import { useSelector } from 'react-redux';

import Hamburger from '../../UI/Hamburger/Hamburger';
import NavBar from '../../UI/NavBar/NavBar';
import PopupMenu from '../../UI/PopupMenu/PopupMenu';

import styles from './Header.module.css';

function Header() {
  const titlePage = useSelector((state) => {
    return state.titlePage.value.title;
  });
  const { isVisible } = useSelector((state) => state.menuBurger);
  return (
    <header className={styles.header}>
      {isVisible ? <PopupMenu /> : ''}
      <h1 className={styles.title}>{titlePage}</h1>
      <div className={styles.header__right}>
        <NavBar />
        <Hamburger />
      </div>
    </header>
  );
}

export default Header;
