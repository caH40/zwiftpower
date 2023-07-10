import React from 'react';

import Th from '../Th/Th';

import { seriesColumns } from './column-titles';

function Thead({ lg, sm, isModerator }) {
  return (
    <thead>
      <tr>
        {seriesColumns(lg, sm).map((column) => (
          <Th key={column.id} columnName={column.name} />
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
