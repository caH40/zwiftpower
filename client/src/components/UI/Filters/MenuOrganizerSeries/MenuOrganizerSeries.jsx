import { useSelector } from 'react-redux';
import cn from 'classnames';

import ButtonForFilter from '../ButtonForFilter/ButtonForFilter';
import { setCurrentMenuItem } from '../../../../redux/features/menuOrganizerSeriesSlice';

import styles from './MenuOrganizerSeries.module.css';

// Кнопки меню.
const menuItems = ['Главная', 'Этапы'];

/**
 * Выбор отображаемого меню при создании/редактировании серии заездов Организатором.
 */
function MenuOrganizerSeries() {
  const { name } = useSelector((state) => state.menuOrganizerSeries.value);

  const quantityButtons = menuItems.length;

  return (
    <div className={styles.box}>
      {menuItems.map((menuItem, index) => (
        <ButtonForFilter
          key={menuItem}
          position={cn({
            left: index === 0,
            center: index !== 0 && quantityButtons > 2 && index + 1 !== quantityButtons,
            right: index !== 0 && index + 1 === quantityButtons,
          })}
          active={name === menuItem}
          reducer={setCurrentMenuItem}
        >
          {menuItem}
        </ButtonForFilter>
      ))}
    </div>
  );
}

export default MenuOrganizerSeries;
