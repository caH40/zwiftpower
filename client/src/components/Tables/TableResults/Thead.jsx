import React from 'react';

import Th from '../Th/Th';

import { resultsColumns } from './column-titles';

function Thead({ lg, sm, isModerator }) {
  return (
    <thead>
      <tr>
        {resultsColumns(lg, sm).map((column) => (
          <Th key={column.id} columnName={column.name} />
        ))}
        {isModerator && <Th key={'Управление'} columnName={'Управление'} />}
      </tr>
    </thead>
  );
}

export default Thead;
