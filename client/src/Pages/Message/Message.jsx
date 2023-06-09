import React from 'react';
import { Link, useParams } from 'react-router-dom';

import t from '../../locales/ru.json';
import useBackground from '../../hook/useBackground';

import styles from './Message.module.css';

function Message() {
  const { messageId, additional } = useParams();
  const message = t.message[messageId];
  useBackground(true, 1);

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
