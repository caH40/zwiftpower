import React from 'react';
import cn from 'classnames';

import { addClasses as cns } from '../../utils/additional-classes';
import { gapStart } from '../../utils/event';
import CategoryBox from '../CategoryBox/CategoryBox';

import styles from './CategoriesBox.module.css';

function CategoriesBox({ event, needGaps, addCls }) {
  const gaps = gapStart(event);
  return (
    <div className={cn(styles.block, cns(styles, addCls))}>
      {event.eventSubgroups.map((group) => {
        const gap =
          gaps[group.subgroupLabel] === 0 ? null : <span>+{gaps[group.subgroupLabel]}мин</span>;

        return (
          <div className={styles.box} key={group.id}>
            <CategoryBox label={group.subgroupLabel} quantityRiders={group.totalEntrantCount} />
            {needGaps && gap}
          </div>
        );
      })}
    </div>
  );
}

export default CategoriesBox;
