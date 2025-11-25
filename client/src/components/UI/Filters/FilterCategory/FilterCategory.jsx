import { useSelector } from 'react-redux';

import ButtonForFilter from '../ButtonForFilter/ButtonForFilter';
import { setFilterCategory } from '../../../../redux/features/filterCategorySlice';
import { plusCategories } from '../../../../assets/rule-category';
import { getButtonPositionClassName } from '../../../../utils/buttonClasses';

import styles from './FilterCategory.module.css';
import { getCategoriesSortedDry } from './categoriesSort';

function FilterCategory({ results, categoriesFromFilters }) {
  const categoryState = useSelector((state) => state.filterCategory.value);

  const categories =
    categoriesFromFilters ||
    getCategoriesSortedDry({
      results,
      getCategory: (r) => r.subgroupLabel,
      needAbsolute: true,
    });
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
          label={plusCategories[category] ?? category}
        >
          {category}
        </ButtonForFilter>
      ))}
    </div>
  );
}

export default FilterCategory;
