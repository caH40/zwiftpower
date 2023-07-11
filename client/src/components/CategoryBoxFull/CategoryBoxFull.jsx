import React from 'react';
import cn from 'classnames';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './CategoryBoxFull.module.css';

function CategoryBoxFull({ label = '' }) {
  const classes = cn(styles.category, styles[label], styles.full);
  const tooltip = '';

  return (
    <MyTooltip tooltip={tooltip}>
      <div className={classes}>{`Группа ${label}`}</div>
    </MyTooltip>
  );
}

export default CategoryBoxFull;
