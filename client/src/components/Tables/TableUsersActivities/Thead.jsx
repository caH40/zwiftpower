import ColumnName from '../Th/ColumnName';

import { userActivitiesColumns } from './column-titles';

function Thead() {
  return (
    <thead>
      <tr>
        {userActivitiesColumns.map((column) => (
          <th key={column.id}>
            <ColumnName columnName={column.name} />
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
