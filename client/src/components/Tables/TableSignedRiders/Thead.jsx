import { useDispatch, useSelector } from 'react-redux';

import styles from '../Table.module.css';

import IconArrows from '../../icons/IconArrows';
import ColumnName from '../Th/ColumnName';
import { sortColumnTable } from '../../../redux/features/sortTableSlice';

import { signedRidersColumnsEnd, signedRidersColumnsStart } from './column-titles';

// Названия столбцов для которых подключаются стрелки сортировки (кроме столбцов CP)
const columnsWithSorting = ['Категория', 'Рейтинговые очки'];

function Thead({ columnsCP }) {
  const dispatch = useDispatch();

  const setSortTable = (columnCPInterval) => {
    dispatch(sortColumnTable(columnCPInterval));
  };

  // Подсвечивания стрелки, указывающей текущую сортировку.
  const activeSorting = useSelector((state) => state.sortTable.activeSorting);

  return (
    <thead>
      <tr>
        {signedRidersColumnsStart.map((column) => (
          <th key={column.id}>
            <div className={styles.th__box}>
              <ColumnName columnName={column.name} />
              {columnsWithSorting.includes(column.name) && (
                <IconArrows
                  columnName={column.name}
                  getClick={setSortTable}
                  squareSize={16}
                  activeDate={{
                    isActive: column.name === activeSorting?.columnName,
                    isRasing: activeSorting?.isRasing,
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
                      isActive: column.interval === activeSorting?.columnName,
                      isRasing: activeSorting?.isRasing,
                    }}
                  />
                </div>
              </th>
            );
          }
          return null;
        })}

        {signedRidersColumnsEnd.map((column) => (
          <th key={column.id}>
            <ColumnName columnName={column.name} />
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
