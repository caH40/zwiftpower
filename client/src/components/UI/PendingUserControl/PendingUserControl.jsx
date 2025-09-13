import IconAdd from '../../icons/IconAdd';
import IconDelete from '../../icons/IconDelete';

import styles from './PendingUserControl.module.css';

/**
 * Блок управления пользователем, подавшим заявку на вступление в команду.
 */
export default function PendingUserControl({ userId, name, controlHandlers }) {
  return (
    <div className={styles.controlContainer}>
      <IconAdd
        addCls="pointer"
        squareSize={20}
        tooltip="Принять заявку"
        getClick={() => controlHandlers.handleApproveRequest({ userId, name })}
      />
      <IconDelete
        color={'orange'}
        addCls="pointer"
        squareSize={20}
        tooltip="Отказать"
        getClick={() => controlHandlers.handleRejectRequest({ userId, name })}
      />
      <IconDelete
        addCls="pointer"
        squareSize={20}
        tooltip="Забанить"
        getClick={() => controlHandlers.handleBanUser({ userId, name })}
      />
    </div>
  );
}
