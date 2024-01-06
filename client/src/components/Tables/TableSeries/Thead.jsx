import ColumnName from '../Th/ColumnName';

import { resultsColumnsFull } from './column-titles';

function Thead() {
  return (
    <thead>
      <tr>
        {resultsColumnsFull.map((column) => (
          <th key={column.id}>
            <ColumnName key={column.id} columnName={column.name} />
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
