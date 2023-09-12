import React from 'react';

import Th from '../Th/Th';

import { catchupColumns } from './column-titles';

function Thead({ md, sm, isModerator }) {
  return (
    <thead>
      <tr>
        {catchupColumns(md, sm).map((column) => (
          <Th key={column.id} columnName={column.name} />
        ))}
        {/* {isModerator && <Th key={'Управление'} columnName={'Управление'} />} */}
      </tr>
    </thead>
  );
}

export default Thead;
