import { IconBan } from '../../icons/IconBan';
import IconDelete from '../../icons/IconDelete';

import styles from './TeamMemberControl.module.css';

/**
 * Блок управления участником команды.
 */
export default function TeamMemberControl({ userId, name, controlHandlers }) {
  return (
    <div className={styles.controlContainer}>
      <IconDelete
        addCls="pointer"
        squareSize={20}
        tooltip="Исключить из команды"
        getClick={() => controlHandlers.handleExcludeUser({ userId, name })}
      />
      <IconBan
        addCls="pointer"
        squareSize={20}
        tooltip="Заблокировать"
        getClick={() => controlHandlers.handleBanUser({ userId, name })}
      />
    </div>
  );
}
