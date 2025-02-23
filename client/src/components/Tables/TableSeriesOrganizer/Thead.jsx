import ColumnName from '../Th/ColumnName';

import { seriesOrganizerColumns } from './column-titles';

function Thead() {
  return (
    <thead>
      <tr>
        {seriesOrganizerColumns.map((column) => (
          <th key={column.id}>
            <ColumnName columnName={column.name} />
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
