import React from 'react';

import Th from '../Th/Th';

import { raceResultsColumns, raceResultsColumnsEnd } from './column-titles';

function Thead({ lg, sm, columnsCP }) {
  return (
    <thead>
      <tr>
        {raceResultsColumns(lg, sm).map((column) => (
          <Th key={column.id} columnName={column.name} />
        ))}
        {lg &&
          columnsCP.map((column) => {
            if (column.isVisible) {
              return <th key={column.id}>{column.name}</th>;
            }
            return null;
          })}
        {lg &&
          raceResultsColumnsEnd.map((column) => (
            <Th key={column.id} columnName={column.name} />
          ))}
      </tr>
    </thead>
  );
}

export default Thead;
