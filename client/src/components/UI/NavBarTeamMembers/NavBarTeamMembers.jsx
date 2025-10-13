import IconArrows from '../../icons/IconArrows';
import ButtonSimple from '../Filters/ButtonSimple/ButtonSimple';

import styles from './NavBarTeamMembers.module.css';

export default function NavBarTeamMembers({ isRasing, setIsRasing }) {
  return (
    <div className={styles.wrapper} onClick={setIsRasing}>
      <ButtonSimple active="true">
        <span>Сортировка</span>
      </ButtonSimple>

      <div className={styles.iconContainer}>
        <IconArrows
          columnName={'Сортировка по фамилии'}
          getClick={() => {}}
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
