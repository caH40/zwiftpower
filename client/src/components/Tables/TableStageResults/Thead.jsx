import ColumnName from '../Th/ColumnName';

import styles from '../Table.module.css';

import {
  raceResultsColumnsCP,
  raceResultsColumnsEnd,
  raceResultsColumnsStart,
} from './column-titles';

function Thead({ isAdmin }) {
  return (
    <thead>
      <tr>
        {raceResultsColumnsStart.map((column) => (
          <th key={column.id}>
            <div className={styles.th__box}>
              <ColumnName columnName={column.name} />
            </div>
          </th>
        ))}

        {raceResultsColumnsCP.map((column) => (
          <th key={column.id}>
            <div className={styles.th__box}>
              <span>{column.name}</span>
            </div>
          </th>
        ))}
        {raceResultsColumnsEnd.map((column) => (
          <th key={column.id}>
            <ColumnName columnName={column.name} />
          </th>
        ))}

        {isAdmin && (
          <th>
            <ColumnName columnName={'Управление'} />
          </th>
        )}
      </tr>
    </thead>
  );
}

export default Thead;
