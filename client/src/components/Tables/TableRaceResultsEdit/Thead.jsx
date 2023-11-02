import { useDispatch, useSelector } from 'react-redux';

import IconArrows from '../../icons/IconArrows';
import Th from '../Th/Th';
import { sortColumnTable } from '../../../redux/features/sortTableSlice';
import ColumnName from '../Th/ColumnName';
import { columnsWithSorting } from '../../../assets/table-sort';

import styles from '../Table.module.css';

import { raceResultsColumns, raceResultsColumnsEnd } from './column-titles';

function Thead({ columnsCP }) {
  const dispatch = useDispatch();

  const setSortTable = (columnCPInterval) => {
    dispatch(sortColumnTable(columnCPInterval));
  };

  const activeSorting = useSelector((state) => state.sortTable.activeSorting);

  return (
    <thead>
      <tr>
        {raceResultsColumns().map((column) => (
          <th key={column.id}>
            <div className={styles.th__box}>
              <ColumnName columnName={column.name} />
              {columnsWithSorting.results.includes(column.name) && (
                <IconArrows
                  columnName={column.name}
                  getClick={setSortTable}
                  squareSize={16}
                  activeDate={{
                    isActive: column.name === activeSorting.columnName,
                    isRasing: activeSorting.isRasing,
                  }}
                />
              )}
            </div>
          </th>
        ))}
        {columnsCP.map((column) => {
          if (column.isVisible) {
            return (
              <th key={column.id}>
                <div className={styles.th__box}>
                  <span>{column.name}</span>
                  <IconArrows
                    columnName={column.interval}
                    getClick={setSortTable}
                    squareSize={16}
                    activeDate={{
                      isActive: column.interval === activeSorting.columnName,
                      isRasing: activeSorting.isRasing,
                    }}
                  />
                </div>
              </th>
            );
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
