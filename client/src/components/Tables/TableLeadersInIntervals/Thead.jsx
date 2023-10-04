import Th from '../Th/Th';

import { leadersInIntervalsColumns } from './column-titles';

function Thead({ type }) {
  return (
    <thead>
      <tr>
        {leadersInIntervalsColumns(type).map((column) => (
          <Th key={column.id} columnName={column.name} />
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
