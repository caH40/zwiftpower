import Th from '../Th/Th';

import { userColumns } from './column-titles';

function Thead() {
  return (
    <thead>
      <tr>
        {userColumns.map((column) => (
          <Th key={column.id} columnName={column.name} />
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
