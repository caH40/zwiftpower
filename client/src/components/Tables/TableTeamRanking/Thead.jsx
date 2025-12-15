import ColumnName from '../Th/ColumnName';

import { teamRankStartColumns } from './column-titles';

function Thead() {
  return (
    <thead>
      <tr>
        {teamRankStartColumns.map((column) => (
          <th key={column.id}>
            <ColumnName
              columnName={column.name}
              place={column.place}
              tooltip={column.tooltip}
            />
          </th>
        ))}

        {/* {teamRankPlacesColumns.map((column) => (
          <th key={column.id}>
            <ColumnName
              columnName={column.name}
              place={column.place}
              tooltip={column.tooltip}
            />
          </th>
        ))} */}

        {/* {teamRankEndColumns.map((column) => (
          <th key={column.id} style={{ textAlign: 'center' }}>
            <ColumnName
              columnName={column.name}
              place={column.place}
              tooltip={column.tooltip}
            />
          </th>
        ))} */}
      </tr>
    </thead>
  );
}

export default Thead;
