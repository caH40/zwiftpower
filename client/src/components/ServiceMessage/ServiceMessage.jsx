import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { IconBell } from '../icons/IconBell';
import { fetchServiceMessages } from '../../redux/features/api/service-message/fetchServiceMessage';
import ServiceMessagePopup from '../ServiceMessagePopup/ServiceMessagePopup';

import styles from './ServiceMessage.module.css';

export default function ServiceMessage() {
  const { serviceMessages } = useSelector((state) => state.serviceMessage);
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const countNotReadMessages = serviceMessages.filter((m) => !m.isRead).length;

  useEffect(() => {
    dispatch(fetchServiceMessages());
  }, [location.pathname]);

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
        messages={serviceMessages}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
