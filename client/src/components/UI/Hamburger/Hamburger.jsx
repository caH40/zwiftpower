import { useDispatch } from 'react-redux';

import { showMenu } from '../../../redux/features/menuBurgerSlice';

import styles from './Hamburger.module.css';

function Hamburger() {
  const dispatch = useDispatch();
  const getMenu = () => {
    dispatch(showMenu());
  };
  return (
    <div className={styles.circle} onClick={getMenu}>
      <div className={styles.hamburger}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
    </div>
  );
}

export default Hamburger;
