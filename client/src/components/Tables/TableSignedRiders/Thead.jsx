import { useDispatch, useSelector } from 'react-redux';

import styles from '../Table.module.css';

import IconArrows from '../../icons/IconArrows';
import Th from '../Th/Th';
import { sortColumnTable } from '../../../redux/features/sortTableSignedSlice';
import IconCategory from '../../icons/IconCategory';

import { signedRidersColumnsEnd, signedRidersColumnsStart } from './column-titles';

function Thead({ columnsCP }) {
  const dispatch = useDispatch();

  const setSortTable = (columnCPInterval) => {
    dispatch(sortColumnTable(columnCPInterval));
  };

  const activeSorting = useSelector((state) => state.sortTableSigned.activeSorting);

  return (
    <thead>
      <tr>
        {signedRidersColumnsStart.map((column) => {
          // для "Категория" добавляются стрелки сортировки
          if (column.name === 'Категория') {
            return (
              <th key={column.id}>
                <div className={styles.th__box}>
                  <IconCategory tooltip={column.name} />
                  <IconArrows
                    columnName={column.name}
                    getClick={setSortTable}
                    squareSize={16}
                    activeDate={{
                      isActive: column.name === activeSorting.columnName,
                      isRasing: activeSorting.isRasing,
                    }}
                  />
                </div>
              </th>
            );
          } else {
            return <Th key={column.id} columnName={column.name} />;
          }
        })}

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

        {signedRidersColumnsEnd.map((column) => (
          <Th key={column.id} columnName={column.name} />
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
