import ColumnName from '../Th/ColumnName';

import { catchupSummaryColumnsFull } from './column-titles';

function Thead() {
  return (
    <thead>
      <tr>
        {catchupSummaryColumnsFull.map((column) => (
          <th key={column.id}>
            <ColumnName columnName={column.name} />
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
