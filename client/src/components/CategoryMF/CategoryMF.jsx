import CategoryOnlyBox from '../CategoryOnlyBox/CategoryOnlyBox';

import styles from './CategoryMF.module.css';

/**
 * Блок категории совмещенный для женской и общей категории
 */
function CategoryMF({ male, category, categoryWomen }) {
  if (!category) {
    return null;
  }
  return (
    <div className={styles.block}>
      {!male && (
        <CategoryOnlyBox label={categoryWomen} female={true} tooltip={'Женская категория'} />
      )}
      <CategoryOnlyBox label={category} tooltip={'Категория, присвоенная Звифтом'} />
    </div>
  );
}
export default CategoryMF;
