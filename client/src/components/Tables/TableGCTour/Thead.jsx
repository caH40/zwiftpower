import ColumnName from '../Th/ColumnName';

import styles from '../Table.module.css';

import { gCTourColumnsStages, TableGCTourColumnsStart } from './column-titles';

function Thead({ isAdmin, stages }) {
  return (
    <thead>
      <tr>
        {TableGCTourColumnsStart.map((column) => (
          <th key={column.id}>
            <div className={styles.th__box}>
              <ColumnName columnName={column.name} />
            </div>
          </th>
        ))}

        {gCTourColumnsStages(stages).map((column) => (
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
