import cn from 'classnames/bind';

import styles from './CategoryBoxFull.module.css';

const cx = cn.bind(styles);

/**
 * Блок с названием группы (категории).
 */
function CategoryBoxFull({ label }) {
  // Изменение названия для группы А+
  const labelCurrent = label === 'APlus' ? 'A+' : label;

  return <div className={cx('category', label, 'full')}>{`Группа ${labelCurrent}`}</div>;
}

export default CategoryBoxFull;
