import React from 'react';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import FaqCategory from '../../components/FaqBlock/FaqCategory';
import FaqIcons from '../../components/FaqBlock/FaqIcons';

import styles from './Faq.module.css';

function Faq() {
  useTitle('Часто задаваемые вопросы');
  useBackground(false);
  return (
    <section className={styles.wrapper}>
      <FaqCategory />
      <FaqIcons />
    </section>
  );
}

export default Faq;
