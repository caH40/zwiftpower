import { useSelector } from 'react-redux';

import ButtonForFilter from '../ButtonForFilter/ButtonForFilter';
import { setWattsCategory } from '../../../../redux/features/filterWattsSlice';
import { getButtonPositionClassName } from '../../../../utils/buttonClasses';

import styles from './FilterWatts.module.css';

function FilterWatts() {
  const wattsState = useSelector((state) => state.filterWatts.value);

  const buttonsWatt = ['вт/кг', 'ватты'];
  const quantityButtonsWatt = buttonsWatt.length;
  return (
    <div className={styles.box}>
      {buttonsWatt.map((wattsName, index) => (
        <ButtonForFilter
          key={wattsName}
          positionClassName={getButtonPositionClassName({
            index,
            quantityBtn: buttonsWatt.length,
          })}
          active={wattsState.name === wattsName}
          reducer={setWattsCategory}
        >
          {wattsName}
        </ButtonForFilter>
      ))}
    </div>
  );
}

export default FilterWatts;
