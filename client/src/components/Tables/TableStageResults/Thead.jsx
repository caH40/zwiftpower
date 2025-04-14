import { useDispatch, useSelector } from 'react-redux';

import IconArrows from '../../icons/IconArrows';
import { sortColumnTable } from '../../../redux/features/sortTableSlice';
import ColumnName from '../Th/ColumnName';

import styles from '../Table.module.css';

import {
  raceResultsColumns,
  raceResultsColumnsCP,
  raceResultsColumnsEnd,
} from './column-titles';

function Thead({ showIndex, isAdmin }) {
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
            </div>
          </th>
        ))}

        {raceResultsColumnsCP.map((column) => (
          <th key={column.id}>
            <div className={styles.th__box}>
              <span>{column.name}</span>
            </div>
          </th>
        ))}
        {raceResultsColumnsEnd.map((column) => (
          <th key={column.id}>
            <ColumnName columnName={column.name} />
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
