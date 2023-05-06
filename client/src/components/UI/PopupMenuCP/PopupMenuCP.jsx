import React from 'react';
import { useSelector } from 'react-redux';

import { setColumnsCP } from '../../../redux/features/columnsCPSlice';
import RCheckboxUni from '../ReduxUI/RCheckboxUni/RCheckboxUni';

import styles from './PopupMenuCP.module.css';

function PopupMenuCP({ setIsOpened }) {
  const columnsCP = useSelector((state) => state.columnsCP.value);

  return (
    <div className={styles.box} onMouseLeave={() => setIsOpened(false)}>
      <>
        {columnsCP.map((cp) => (
          <RCheckboxUni
            reducer={setColumnsCP}
            values={columnsCP}
            property={cp.nameInMenu}
            title={cp.nameInMenu}
            key={cp.id}
          />
        ))}
      </>
    </div>
  );
}

export default PopupMenuCP;
