import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import cn from 'classnames/bind';

import {
  fetchPutServiceMessages,
  fetchServiceMessages,
} from '../../redux/features/api/service-message/fetchServiceMessage';
import { getTimerLocal } from '../../utils/date-local';

import styles from './ServiceMessagePopup.module.css';

const cx = cn.bind(styles);

/**
 * @param {Object[]} messages - массив сообщений
 * @param {string} messages._id
 * @param {string} messages.title
 * @param {string} messages.text
 * @param {string} [messages.url]
 * @param {boolean} messages.isRead
 * @param {string} messages.createdAt
 * @param {boolean} isOpen - состояние открытия попапа
 * @param {Function} onClose - функция для закрытия попапа
 */
export default function ServiceMessagePopup({ messages, isOpen, onClose }) {
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
      await dispatch(fetchPutServiceMessages({ messageIds: [_id] })).unwrap();

      await dispatch(fetchServiceMessages()).unwrap();
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
            to={msg.url || '#'}
            className={cx('message', { unread: !msg.isRead })}
            onClick={() => handleClick({ isRead: msg.isRead, _id: msg._id })}
          >
            <div className={styles.title}>{msg.title}</div>
            <div className={styles.text}>{msg.text}</div>
            <div className={styles.date}>{getTimerLocal(msg.createdAt, 'DDMMYYHm')}</div>
          </Link>
        ))
      )}
    </div>
  );
}
