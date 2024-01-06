import ColumnName from '../Th/ColumnName';

import { raceResultsColumns, raceResultsColumnsEnd } from './column-titles';

function Thead({ columnsCP }) {
  return (
    <thead>
      <tr>
        {raceResultsColumns().map((column) => (
          <th key={column.id}>
            <ColumnName columnName={column.name} />
          </th>
        ))}
        {columnsCP.map((column) => {
          if (column.isVisible) {
            return <th key={column.id}>{column.name}</th>;
          }
          return null;
        })}
        {raceResultsColumnsEnd.map((column) => (
          <th key={column.id}>
            <ColumnName columnName={column.name} />
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
