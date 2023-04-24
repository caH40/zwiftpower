import React from 'react';

import { gapStart } from '../../utils/event';
import CategoryBox from '../CategoryBox/CategoryBox';

import styles from './CategoriesBox.module.css';

function CategoriesBox({ event }) {
  const gaps = gapStart(event);
  return (
    <div className={styles.block}>
      {event.eventSubgroups.map((group) => (
        <div className={styles.box} key={group._id}>
          <CategoryBox label={group.subgroupLabel} quantityRiders={group.totalEntrantCount} />
          {gaps[group.subgroupLabel] === 0 ? null : (
            <span>+{gaps[group.subgroupLabel]}мин</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default CategoriesBox;
