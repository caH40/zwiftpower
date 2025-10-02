import { useState } from 'react';

import IconEdit from '../icons/IconEdit';
import PopupMenuTableStageResult from '../UI/PopupMenuTable/PopupMenuTableStageResult';

import styles from './StageResultMenu.module.css';

/**
 * Блок для иконки и popup меню для взаимодействия с выбранным результатом райдера на Этапе.
 */
export default function StageResultMenu(props) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.wrapper}>
      <IconEdit
        addCls="pointer"
        squareSize={20}
        getClick={() => setShowMenu((prev) => !prev)}
      />
      <PopupMenuTableStageResult showMenu={showMenu} setShowMenu={setShowMenu} {...props} />
    </div>
  );
}
