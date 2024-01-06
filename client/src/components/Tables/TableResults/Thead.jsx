import ColumnName from '../Th/ColumnName';

import { resultsColumns } from './column-titles';

function Thead({ isModerator }) {
  return (
    <thead>
      <tr>
        {resultsColumns().map((column) => (
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
