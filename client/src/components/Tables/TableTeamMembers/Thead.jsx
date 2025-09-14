import styles from '../Table.module.css';

import ColumnName from '../Th/ColumnName';

import { teamMembersColumnsStart, teamMembersColumnsEnd } from './column-titles';

function Thead() {
  return (
    <thead>
      <tr>
        {teamMembersColumnsStart.map((column) => (
          <th key={column.id}>
            <div className={styles.th__box}>
              <ColumnName columnName={column.name} />
            </div>
          </th>
        ))}

        {teamMembersColumnsEnd.map((column) => (
          <th key={column.id}>
            <ColumnName columnName={column.name} />
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
