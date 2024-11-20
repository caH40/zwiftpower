import ColumnName from '../Th/ColumnName';

import { riderBansColumns } from './column-titles';

function Thead() {
  return (
    <thead>
      <tr>
        {riderBansColumns.map((column) => (
          <th key={column.id}>
            <ColumnName columnName={column.name} />
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
