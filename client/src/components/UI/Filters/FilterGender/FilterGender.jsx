import { useSelector } from 'react-redux';
import cn from 'classnames';

import ButtonForFilter from '../ButtonForFilter/ButtonForFilter';
import { setFilterGender } from '../../../../redux/features/filterGenderSlice';

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
          position={cn({
            left: index === 0,
            center: index !== 0 && quantityButtons > 2 && index + 1 !== quantityButtons,
            right: index !== 0 && index + 1 === quantityButtons,
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
