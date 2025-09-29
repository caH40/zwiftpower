import ColumnName from '../Th/ColumnName';

import { raceResultsColumns } from './column-titles';

function Thead() {
  return (
    <thead>
      <tr>
        {raceResultsColumns.map((column) => (
          <th key={column.id}>
            <ColumnName columnName={column.name} />
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
