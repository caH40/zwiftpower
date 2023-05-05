import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import ButtonForFilter from '../ButtonForFilter/ButtonForFilter';
import { setWattsCategory } from '../../../../redux/features/filterWattsSlice';

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
          position={cn({
            left: index === 0,
            center: index !== 0 && quantityButtonsWatt > 2 && index + 1 !== quantityButtonsWatt,
            right: index !== 0 && index + 1 === quantityButtonsWatt,
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
