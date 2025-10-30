import ColumnName from '../Th/ColumnName';

import styles from '../Table.module.css';

import {
  teamRankStartColumns,
  teamRankPlacesColumns,
  teamRankEndColumns,
} from './column-titles';

function Thead() {
  return (
    <thead>
      <tr>
        {teamRankStartColumns.map((column) => (
          <th rowSpan={2} key={column.id}>
            <ColumnName
              columnName={column.name}
              place={column.place}
              tooltip={column.tooltip}
            />
          </th>
        ))}

        <th colSpan={3} className={styles.wins}>
          Победы в заездах
        </th>

        {teamRankEndColumns.map((column) => (
          <th rowSpan={2} key={column.id}>
            <ColumnName
              columnName={column.name}
              place={column.place}
              tooltip={column.tooltip}
            />
          </th>
        ))}
      </tr>

      <tr>
        {teamRankPlacesColumns.map((column) => (
          <th
            key={column.id}
            style={{ maxWidth: '50px', width: '50px', minWidth: '50px', textAlign: 'center' }}
          >
            <ColumnName
              columnName={column.name}
              place={column.place}
              tooltip={column.tooltip}
            />
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
