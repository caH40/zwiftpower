import { useState } from 'react';

import { IconBell } from '../icons/IconBell';
import { useWebSocket } from '../../hook/useWebSocket';
import ServiceMessagePopup from '../ServiceMessagePopup/ServiceMessagePopup';

import styles from './ServiceMessage.module.css';

export default function ServiceMessage() {
  const [serverData, setServerData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const countNotReadMessages = serverData.filter((m) => !m.isRead).length;

  // Работа с вебсокетом.
  useWebSocket(setServerData);

  return (
    <div
      className={styles.wrapper}
      onClick={() => setIsOpen((prev) => !prev)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={styles.bellContainer}
        aria-label={`У вас ${countNotReadMessages} непрочитанных сообщений`}
      >
        <IconBell squareSize={20} isActive={isOpen} isHover={isHover} />
      </div>

      {countNotReadMessages > 0 && (
        <div className={styles.messageContainer}>
          <span className={styles.messages}>{countNotReadMessages}</span>
        </div>
      )}

      <ServiceMessagePopup
        messages={serverData}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setIsHover={setIsHover}
      />
    </div>
  );
}
