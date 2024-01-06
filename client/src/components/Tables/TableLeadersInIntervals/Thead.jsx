import ColumnName from '../Th/ColumnName';

import { leadersInIntervalsColumns } from './column-titles';

function Thead({ type }) {
  return (
    <thead>
      <tr>
        {leadersInIntervalsColumns(type).map((column) => (
          <th key={column.id}>
            <ColumnName columnName={column.name} />
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
