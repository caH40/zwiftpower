import cn from 'classnames/bind';

import { racingScoreDefault as rs } from '../../../assets/rule-category';

import styles from './TableCategory.module.css';

const cx = cn.bind(styles);

const categories = [
  { label: 'A', name: 'A' },
  { label: 'B', name: 'B' },
  { label: 'C', name: 'C' },
  { label: 'D', name: 'D' },
  { label: 'E', name: 'E' },
];

function TableCategoryRS() {
  return (
    <table className={styles.table}>
      <caption>Категории на основе Рейтинговых очков</caption>
      <thead>
        <tr>
          <th></th>
          <th>Rasing Score</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((cat) => (
          <tr key={cat.label}>
            <td>
              <div className={cx('categoryBox', cat.name)}>{`Категория ${cat.label}`}</div>
            </td>
            <td>
              <div className={cx('categoryBox', cat.name)}>{`${rs[cat.name].min} - ${Math.round(
                rs[cat.name].max
              )}`}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableCategoryRS;
