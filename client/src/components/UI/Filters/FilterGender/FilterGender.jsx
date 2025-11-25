import { useSelector } from 'react-redux';

import ButtonForFilter from '../ButtonForFilter/ButtonForFilter';
import { setFilterGender } from '../../../../redux/features/filterGenderSlice';
import { getButtonPositionClassName } from '../../../../utils/buttonClasses';

import styles from './FilterGender.module.css';

/**
 * Установка категории в хранилище для фильтрации.
 */
function FilterGender() {
  const genderState = useSelector((state) => state.filterGender.value);

  const quantityButtons = 3;

  return (
    <div className={styles.box}>
      {['All', 'М', 'Ж'].map((gender, index) => (
        <ButtonForFilter
          key={gender}
          positionClassName={getButtonPositionClassName({
            index,
            quantityBtn: quantityButtons,
          })}
          active={genderState.name === gender}
          reducer={setFilterGender}
        >
          {gender}
        </ButtonForFilter>
      ))}
    </div>
  );
}

export default FilterGender;
