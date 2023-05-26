import React from 'react';

import Th from '../Th/Th';

import { signedRidersColumns } from './column-titles';

function Thead({ lg, sm }) {
  return (
    <thead>
      <tr>
        {signedRidersColumns(lg, sm).map((column) => (
          <Th key={column.id} columnName={column.name} />
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
