import Th from '../Th/Th';

import { signedRidersColumns } from './column-titles';

function Thead() {
  return (
    <thead>
      <tr>
        {signedRidersColumns().map((column) => (
          <Th key={column.id} columnName={column.name} />
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
