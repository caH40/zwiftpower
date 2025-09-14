import { IconBan } from '../../icons/IconBan';

import styles from './BanUserControl.module.css';

/**
 * Блок управления заблокированными пользователем.
 */
export default function BanUserControl({ userId, name, controlHandlers }) {
  return (
    <div className={styles.controlContainer}>
      <IconBan
        color="green"
        addCls="pointer"
        squareSize={20}
        tooltip="Снять блокировку"
        getClick={() => controlHandlers.handleCancelBanUser({ userId, name })}
      />
    </div>
  );
}
