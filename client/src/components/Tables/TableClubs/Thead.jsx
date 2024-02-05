import { clubColumns } from './column-titles';

function Thead() {
  return (
    <thead>
      <tr>
        {clubColumns.map((column) => (
          <th key={column.id}>{column.name}</th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
