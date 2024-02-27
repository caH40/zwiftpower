import styles from '../Table.module.css';

import ColumnName from '../Th/ColumnName';

import { ridersColumnsStart, ridersColumnsEnd, ridersColumnsCP } from './column-titles';

function Thead() {
  return (
    <thead>
      <tr>
        {ridersColumnsStart.map((column) => (
          <th key={column.id}>
            <div className={styles.th__box}>
              <ColumnName columnName={column.name} tooltip={column.tooltip} />
            </div>
          </th>
        ))}

        {ridersColumnsCP.map((column) => {
          if (column.isVisible) {
            return (
              <th key={column.id}>
                <div className={styles.th__box}>
                  <span>{column.name}</span>
                </div>
              </th>
            );
          }
          return null;
        })}

        {ridersColumnsEnd.map((column) => (
          <th key={column.id}>
            <ColumnName columnName={column.name} />
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
