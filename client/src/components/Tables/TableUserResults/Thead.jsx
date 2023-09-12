import React from 'react';

import Th from '../Th/Th';

import { raceResultsColumns, raceResultsColumnsEnd } from './column-titles';

function Thead({ md, sm, columnsCP }) {
  return (
    <thead>
      <tr>
        {raceResultsColumns(md, sm).map((column) => (
          <Th key={column.id} columnName={column.name} />
        ))}
        {md &&
          columnsCP.map((column) => {
            if (column.isVisible) {
              return <th key={column.id}>{column.name}</th>;
            }
            return null;
          })}
        {md &&
          raceResultsColumnsEnd.map((column) => (
            <Th key={column.id} columnName={column.name} />
          ))}
      </tr>
    </thead>
  );
}

export default Thead;
