import React from 'react';

import Th from '../Th/Th';

import { catchupColumns } from './column-titles';

function Thead({ isModerator }) {
  return (
    <thead>
      <tr>
        {catchupColumns().map((column) => (
          <Th key={column.id} columnName={column.name} />
        ))}
        {/* {isModerator && <Th key={'Управление'} columnName={'Управление'} />} */}
      </tr>
    </thead>
  );
}

export default Thead;
