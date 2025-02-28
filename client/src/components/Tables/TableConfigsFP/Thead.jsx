import ColumnName from '../Th/ColumnName';

import { configsFPColumns } from './column-titles';

function Thead() {
  return (
    <thead>
      <tr>
        {configsFPColumns.map((column) => (
          <th key={column.id}>
            <ColumnName columnName={column.name} />
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
