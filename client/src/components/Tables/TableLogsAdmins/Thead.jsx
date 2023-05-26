import React from 'react';

import { logsAdminsColumns } from './column-titles';

function Thead({ lg, sm }) {
  return (
    <thead>
      <tr>
        {logsAdminsColumns(lg, sm).map((column) => (
          <th key={column.id}>{column.name}</th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
