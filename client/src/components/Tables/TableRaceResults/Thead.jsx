import { useDispatch, useSelector } from 'react-redux';

import IconArrows from '../../icons/IconArrows';
import { sortColumnTable } from '../../../redux/features/sortTableSlice';
import ColumnName from '../Th/ColumnName';

import styles from '../Table.module.css';

import { raceResultsColumns, raceResultsColumnsEnd } from './column-titles';

// Названия столбцов для которых подключаются стрелки сортировки (кроме столбцов CP)
const columnsWithSorting = ['Время', 'Категория'];

function Thead({ columnsCP, showIndex, isAdmin }) {
  const dispatch = useDispatch();

  const setSortTable = (columnCPInterval) => {
    dispatch(sortColumnTable(columnCPInterval));
  };

  const activeSorting = useSelector((state) => state.sortTable.activeSorting);

  return (
    <thead>
      <tr>
        {raceResultsColumns(showIndex).map((column) => (
          <th key={column.id}>
            <div className={styles.th__box}>
              <ColumnName columnName={column.name} />
              {columnsWithSorting.includes(column.name) && (
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
          <th key={column.id}>
            <ColumnName columnName={column.name} tooltip={column.tooltip} />
          </th>
        ))}

        {isAdmin && (
          <th>
            <ColumnName columnName={'Управление'} />
          </th>
        )}
      </tr>
    </thead>
  );
}

export default Thead;
