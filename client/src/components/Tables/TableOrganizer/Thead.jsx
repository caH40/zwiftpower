import { organizerColumns } from './column-titles';

function Thead() {
  return (
    <thead>
      <tr>
        {organizerColumns.map((column) => (
          <th key={column.id}>{column.name}</th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
