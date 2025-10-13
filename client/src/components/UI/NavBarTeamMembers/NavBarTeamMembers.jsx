import IconArrows from '../../icons/IconArrows';
import ButtonSimple from '../Filters/ButtonSimple/ButtonSimple';

import styles from './NavBarTeamMembers.module.css';

export default function NavBarTeamMembers({ isRasing, setIsRasing }) {
  return (
    <div className={styles.wrapper}>
      <ButtonSimple active="true" getClick={setIsRasing}>
        <span>Сортировка</span>
      </ButtonSimple>

      <div className={styles.iconContainer}>
        <IconArrows
          columnName={'Сортировка по фамилии'}
          getClick={setIsRasing}
          squareSize={16}
          activeDate={{
            isActive: true,
            isRasing,
          }}
        />
      </div>
    </div>
  );
}
