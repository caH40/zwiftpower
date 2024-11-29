import ColumnName from '../Th/ColumnName';

import { leaderboardCatchupColumns } from './column-titles';

function Thead() {
  return (
    <thead>
      <tr>
        {leaderboardCatchupColumns.map((column) => (
          <th key={column.id}>
            <ColumnName columnName={column.name} />
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
