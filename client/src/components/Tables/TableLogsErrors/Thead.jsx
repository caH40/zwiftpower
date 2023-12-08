import { logsErrorsColumns } from './column-titles';

function Thead({ lg, sm }) {
  return (
    <thead>
      <tr>
        {logsErrorsColumns(lg, sm).map((column) => (
          <th key={column.id}>{column.name}</th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
