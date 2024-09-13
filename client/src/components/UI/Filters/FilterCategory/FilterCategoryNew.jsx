import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import ButtonForFilter from '../ButtonForFilter/ButtonForFilter';
import { setFilterCategory } from '../../../../redux/features/filterCategorySlice';

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
          position={cn({
            left: index === 0,
            center: index !== 0 && quantityCategories > 2 && index + 1 !== quantityCategories,
            right: index !== 0 && index + 1 === quantityCategories,
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
