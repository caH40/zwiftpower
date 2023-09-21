import React from 'react';

import Th from '../Th/Th';

import { raceResultsColumns, raceResultsColumnsEnd } from './column-titles';

function Thead({ columnsCP }) {
  return (
    <thead>
      <tr>
        {raceResultsColumns().map((column) => (
          <Th key={column.id} columnName={column.name} />
        ))}
        {columnsCP.map((column) => {
          if (column.isVisible) {
            return <th key={column.id}>{column.name}</th>;
          }
          return null;
        })}
        {raceResultsColumnsEnd.map((column) => (
          <Th key={column.id} columnName={column.name} />
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
