import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import t from '../../locales/ru.json';
import { setBackground } from '../../redux/features/backgroundSlice';

import styles from './Message.module.css';

function Message() {
  const { messageId, additional } = useParams();
  const message = t.message[messageId];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBackground({ isActive: true, opacity: 1 }));
    return () => dispatch(setBackground({ isActive: false }));
  }, [dispatch]);

  return (
    <main className={styles.wrapper}>
      {message ? (
        <div className={styles.inner}>
          <h1 className={styles.title}>{message.title}</h1>
          <p className={styles.text}>{`${message.text_1}${
            additional !== 'none' ? additional + message.text_2 : ''
          }`}</p>
          <Link className={styles.link} to={message.link}>
            {message.linkText}
          </Link>
        </div>
      ) : (
        ''
      )}
    </main>
  );
}

export default Message;
