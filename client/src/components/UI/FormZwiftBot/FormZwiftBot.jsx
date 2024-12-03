import { useState } from 'react';

import Button from '../Button/Button';
import InputSimple from '../Input/InputSimple';

import styles from './FormZwiftBot.module.css';

/**
 * Форма ввода данных для бота-модератора клуба в Zwift.
 */
export default function FormZwiftBot({ sendForm, token }) {
  const [username, setUsername] = useState(token?.username || '');
  const [password, setPassword] = useState('');

  const getClick = () => {
    if (!password || !username) {
      return;
    }

    sendForm({ username, password });
  };

  return (
    <form className={styles.wrapper}>
      <h2 className={styles.title}>{`Обновление токена бота-модератора (${
        token.importance === 'main' ? 'основного' : 'дополнительного'
      })`}</h2>
      <div className={styles.wrapper__input}>
        <InputSimple
          label={'Логин бота (email)'}
          id={'email'}
          type={'email'}
          value={username}
          setValue={setUsername}
          autoComplete={'off'}
        />
      </div>

      <div className={styles.wrapper__input}>
        <InputSimple
          label={'Пароль бота'}
          id={'password'}
          type={'password'}
          value={password}
          setValue={setPassword}
          autoComplete={'off'}
        />
      </div>

      <Button getClick={getClick}>Обновить</Button>
    </form>
  );
}
