import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { confirmEmail } from '../../api/email';
import useTitle from '../../hook/useTitle';

import styles from './ConfirmEmail.module.css';

const ConfirmEmail = () => {
  const [message, setMessage] = useState('');
  const { token } = useParams();

  useTitle('Страница активации аккаунта');

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
};

export default ConfirmEmail;
