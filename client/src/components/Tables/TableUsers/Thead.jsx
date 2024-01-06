import ColumnName from '../Th/ColumnName';

import { userColumns } from './column-titles';

function Thead() {
  return (
    <thead>
      <tr>
        {userColumns.map((column) => (
          <th key={column.id}>
            <ColumnName columnName={column.name} />
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
