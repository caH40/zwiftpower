import cn from 'classnames/bind';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './CategoryBox.module.css';

const cx = cn.bind(styles);

function CategoryBox({ label = '', showLabel, quantityRiders = '', circle, full }) {
  // Изменение названия для группы А+
  let labelCurrent = label === 'APlus' ? 'A+' : label;
  labelCurrent = label === null ? '?' : labelCurrent;

  // Отображаемое значение.
  const value = `${showLabel ? labelCurrent : ''}${quantityRiders}`;

  // если circle:true то подсказка - только название категории
  const registered = circle ? '' : `. Зарегистрировалось: ${quantityRiders}`;
  const finished = `Финишировало: ${quantityRiders}`;
  // если label:T то подсказка - финишный блок с соответствующим описанием
  const tooltip = labelCurrent === 'T' ? finished : `Категория: ${labelCurrent}${registered}`;

  return (
    <MyTooltip tooltip={tooltip}>
      <div className={cx('category', String(label), { circle, full })}>{value}</div>
    </MyTooltip>
  );
}

export default CategoryBox;
