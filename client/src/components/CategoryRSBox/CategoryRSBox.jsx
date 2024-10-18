import cn from 'classnames/bind';

import { getCategoryRacingScore } from '../../utils/category';

import styles from './CategoryRSBox.module.css';

const cx = cn.bind(styles);

/**
 * Компонент CategoryRSBox отображает значение racingScore и его категорию.
 * В зависимости от значения racingScore определяет соответствующий класс для отображения.
 * Если racingScore не попадает ни в один диапазон, используется класс по умолчанию 'gray'.
 *
 * @param {Object} props - Свойства компонента.
 * @param {number} props.racingScore - Значение, по которому определяется категория.
 * @returns {JSX.Element} Элемент div, отображающий racingScore с соответствующим классом.
 */
export default function CategoryRSBox({ racingScore }) {
  const categoryLabel = getCategoryRacingScore(racingScore) || 'gray';

  return (
    <div className={cx('categoryBox', categoryLabel)}>
      {racingScore} {/* Отображаем значение racingScore внутри div */}
    </div>
  );
}
