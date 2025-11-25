import { useSelector } from 'react-redux';

import ButtonForFilter from '../ButtonForFilter/ButtonForFilter';
import { setFilterCategory } from '../../../../redux/features/filterCategorySlice';
import { getButtonPositionClassName } from '../../../../utils/buttonClasses';

import styles from './FilterCategory.module.css';

/**
 * Установка категории в хранилище для фильтрации.
 */
function FilterCategoryNew({ categories }) {
  const categoryState = useSelector((state) => state.filterCategory.value);

  const quantityCategories = categories.length;

  return (
    <div className={styles.box}>
      {categories.map((category, index) => (
        <ButtonForFilter
          key={category}
          positionClassName={getButtonPositionClassName({
            index,
            quantityBtn: quantityCategories,
          })}
          active={categoryState.name === category}
          reducer={setFilterCategory}
        >
          {category}
        </ButtonForFilter>
      ))}
    </div>
  );
}

export default FilterCategoryNew;
