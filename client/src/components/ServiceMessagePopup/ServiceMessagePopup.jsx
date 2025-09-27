import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import cn from 'classnames/bind';

import { fetchPutServiceMessages } from '../../redux/features/api/service-message/fetchServiceMessage';
import { getTimerLocal } from '../../utils/date-local';

import styles from './ServiceMessagePopup.module.css';

const cx = cn.bind(styles);

/**
 * @param {Object[]} messages - массив сообщений
 * @param {string} messages._id
 * @param {string} messages.title
 * @param {string} messages.text
 * @param {string} [messages.entityUrl]
 * @param {string} [messages.entityLogo]
 * @param {boolean} messages.isRead
 * @param {string} messages.createdAt
 * @param {boolean} isOpen - состояние открытия попапа
 * @param {Function} onClose - функция для закрытия попапа
 * @param {Function} setIsHover - Функция контроля ховер эффекта на колоколе.
 */
export default function ServiceMessagePopup({ messages, isOpen, onClose, setIsHover }) {
  const popupRef = useRef(null);
  const dispatch = useDispatch();

  // Закрытие при клике вне попапа
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  const handleClick = async (_id) => {
    try {
      setIsHover(false);
      await dispatch(fetchPutServiceMessages({ messageId: _id })).unwrap();
    } catch (error) {
      console.error(error); // eslint-disable-line
    }
  };

  return (
    <div className={styles.popup} ref={popupRef} onMouseLeave={() => onClose()}>
      {messages.length === 0 ? (
        <div className={styles.empty}>Нет сообщений</div>
      ) : (
        messages.map((msg) => (
          <Link
            key={msg._id}
            to={msg.entityUrl || '#'}
            className={cx('messageContainer', { unread: !msg.isRead })}
            onClick={() => handleClick({ isRead: msg.isRead, _id: msg._id })}
          >
            {msg.entityLogo ? (
              <img
                src={msg.entityLogo}
                width={36}
                height={36}
                alt="Logo"
                className={styles.entityLogo}
              />
            ) : (
              <div className={styles.emptyLogo}>?</div>
            )}

            <div className={styles.message}>
              <div className={styles.title}>{msg.title}</div>
              <div className={styles.text}>{msg.text}</div>
              <div className={styles.date}>{getTimerLocal(msg.createdAt, 'DDMMYYHm')}</div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
