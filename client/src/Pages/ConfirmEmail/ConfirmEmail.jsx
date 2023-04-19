import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { confirmEmail } from '../../api/email';
import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';

import styles from './ConfirmEmail.module.css';

function ConfirmEmail() {
  const [message, setMessage] = useState('');
  const { token } = useParams();

  useTitle('Страница активации аккаунта');
  useBackground(false);

  useEffect(() => {
    confirmEmail(token).then((response) => {
      setMessage(response.data.message);
    });
  }, [token]);
  return (
    <section className={styles.support}>
      <p className={styles.text}>{message}</p>
    </section>
  );
}

export default ConfirmEmail;
