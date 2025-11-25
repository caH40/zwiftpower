import { useSelector } from 'react-redux';

import ButtonForFilter from '../ButtonForFilter/ButtonForFilter';
import { setCurrentMenuItem } from '../../../../redux/features/menuOrganizerSeriesSlice';
import { getButtonPositionClassName } from '../../../../utils/buttonClasses';

import styles from './MenuOrganizerSeries.module.css';

// Кнопки меню.
const menuItems = ['Главная', 'Этапы'];

/**
 * Выбор отображаемого меню при создании/редактировании серии заездов Организатором.
 */
function MenuOrganizerSeries() {
  const { name } = useSelector((state) => state.menuOrganizerSeries.value);

  return (
    <div className={styles.box}>
      {menuItems.map((menuItem, index) => (
        <ButtonForFilter
          key={menuItem}
          positionClassName={getButtonPositionClassName({
            index,
            quantityBtn: menuItems.length,
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
