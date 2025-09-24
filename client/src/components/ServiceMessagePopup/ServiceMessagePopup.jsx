import { useEffect, useRef } from 'react';
import cn from 'classnames/bind';

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
export default function ServiceMessagePopup({
  messages,
  isOpen,
  onClose,
  readIds,
  setReadIds,
}) {
  const popupRef = useRef(null);

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

  const handleHover = async ({ isRead, _id }) => {
    // Не добавляем уже прочитанные сообщения.
    if (isRead) {
      return;
    }

    setReadIds((prev) => new Set([...prev, _id]));
  };

  return (
    <div className={styles.popup} ref={popupRef} onMouseLeave={() => onClose()}>
      {messages.length === 0 ? (
        <div className={styles.empty}>Нет сообщений</div>
      ) : (
        messages.map((msg) => (
          <a
            key={msg._id}
            href={msg.url || '#'}
            className={cx('message', { unread: !msg.isRead && !readIds.has(msg._id) })}
            onMouseOver={() => handleHover({ isRead: msg.isRead, _id: msg._id })}
          >
            <div className={styles.title}>{msg.title}</div>
            <div className={styles.text}>{msg.text}</div>
            <div className={styles.date}>{new Date(msg.createdAt).toLocaleString()}</div>
          </a>
        ))
      )}
    </div>
  );
}
