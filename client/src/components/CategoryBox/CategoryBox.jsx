import React from 'react';
import cn from 'classnames';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './CategoryBox.module.css';

function CategoryBox({ label = '', showLabel, quantityRiders = '', circle, full }) {
  const classes = cn(styles.category, styles[label], {
    [styles.circle]: circle,
    [styles.full]: full,
  });
  const value = `${showLabel ? label : ''} ${quantityRiders}`;

  // если circle:true то подсказка - только название категории
  const registered = circle ? '' : `. Зарегистрировалось: ${quantityRiders}`;
  const finished = `Финишировало: ${quantityRiders}`;
  // если label:T то подсказка - финишный блок с соответствующим описанием
  const tooltip = label === 'T' ? finished : `Категория: ${label}${registered}`;

  return (
    <MyTooltip tooltip={tooltip}>
      <div className={classes}>{value}</div>
    </MyTooltip>
  );
}

export default CategoryBox;
