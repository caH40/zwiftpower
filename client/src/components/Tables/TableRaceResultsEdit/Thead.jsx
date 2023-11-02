import Th from '../Th/Th';
import ColumnName from '../Th/ColumnName';
import styles from '../Table.module.css';

import { raceResultsColumns, raceResultsColumnsEnd } from './column-titles';

function Thead({ columnsCP }) {
  return (
    <thead>
      <tr>
        {raceResultsColumns().map((column) => (
          <th key={column.id}>
            <div className={styles.th__box}>
              <ColumnName columnName={column.name} />
            </div>
          </th>
        ))}
        {columnsCP.map((column) => {
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
        {raceResultsColumnsEnd.map((column) => (
          <Th key={column.id} columnName={column.name} />
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
