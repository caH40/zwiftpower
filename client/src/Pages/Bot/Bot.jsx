import React, { useState } from 'react';
import axios from 'axios';

import useTitle from '../../hook/useTitle';
import SimpleInput from '../../components/UI/SimpleInput/SimpleInput';
import Button from '../../components/UI/Button/Button';
import { postNotice } from '../../api/bot-notice';

import styles from './Bot.module.css';

function Bot() {
  const [message, setMessage] = useState({ text: '' });
  useTitle('Взаимодействие с ботом Race Info | KOM-on');

  const test = () => {
    axios({
      url: 'http://localhost:8080/api/notice/protocol',
      method: 'post',
      data: { protocol: 'test' },
    }).catch((error) => console.log(error));
  };

  const sendMessage = () => {
    postNotice(message).catch((error) => console.log(error));
    setMessage({ text: '' });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.block}>
        <h2 className={styles.title}>Отправка сообщений</h2>
        <form>
          <SimpleInput
            name="Сообщение для всех пользователей бота"
            state={message}
            setState={setMessage}
            property="text"
          />
          <Button getClick={sendMessage}>Отправить</Button>
        </form>
      </div>
    </section>
  );
}

export default Bot;
