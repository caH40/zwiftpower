import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { IconBell } from '../icons/IconBell';
import {
  fetchPutServiceMessages,
  fetchServiceMessages,
} from '../../redux/features/api/service-message/fetchServiceMessage';
import ServiceMessagePopup from '../ServiceMessagePopup/ServiceMessagePopup';

import styles from './ServiceMessage.module.css';

export default function ServiceMessage() {
  const { serviceMessages } = useSelector((state) => state.serviceMessage);
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [readIds, setReadIds] = useState(new Set());
  const dispatch = useDispatch();
  const location = useLocation();

  const countNotReadMessages = serviceMessages.filter((m) => !m.isRead).length;
  const currentCountNotReadMessages = countNotReadMessages - readIds.size;

  useEffect(() => {
    dispatch(fetchServiceMessages());
  }, [location.pathname]);

  const handleClosePopup = async () => {
    setIsOpen(false);

    if (readIds.size === 0) {
      return;
    }

    try {
      await dispatch(fetchPutServiceMessages({ messageIds: [...readIds] })).unwrap();

      setReadIds(new Set());
      await dispatch(fetchServiceMessages()).unwrap();
    } catch (error) {
      console.error(error); // eslint-disable-line
    }
  };

  return (
    <div
      className={styles.wrapper}
      onClick={() => setIsOpen((prev) => !prev)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={styles.bellContainer}
        aria-label={`У вас ${currentCountNotReadMessages} непрочитанных сообщений`}
      >
        <IconBell squareSize={20} isActive={isOpen} isHover={isHover} />
      </div>

      {currentCountNotReadMessages > 0 && (
        <div className={styles.messageContainer}>
          <span className={styles.messages}>{currentCountNotReadMessages}</span>
        </div>
      )}

      <ServiceMessagePopup
        messages={serviceMessages}
        isOpen={isOpen}
        onClose={handleClosePopup}
        readIds={readIds}
        setReadIds={setReadIds}
      />
    </div>
  );
}
