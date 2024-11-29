import ColumnName from '../Th/ColumnName';

import { catchupColumns } from './column-titles';

function Thead() {
  return (
    <thead>
      <tr>
        {catchupColumns().map((column) => (
          <th key={column.id}>
            <ColumnName columnName={column.name} />
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
