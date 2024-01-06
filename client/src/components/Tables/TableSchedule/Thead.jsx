import ColumnName from '../Th/ColumnName';

import { scheduleListColumns } from './column-titles';

function Thead({ isModerator }) {
  return (
    <thead>
      <tr>
        {scheduleListColumns().map((column) => (
          <th key={column.id}>
            <ColumnName key={column.id} columnName={column.name} />
          </th>
        ))}
        {isModerator && (
          <th>
            <ColumnName columnName={'Управление'} />
          </th>
        )}
      </tr>
    </thead>
  );
}

export default Thead;
