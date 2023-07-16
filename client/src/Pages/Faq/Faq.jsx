import React from 'react';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import FaqCategory from '../../components/FaqCategory/FaqCategory';

import styles from './Faq.module.css';

function Faq() {
  useTitle('Часто задаваемые вопросы');
  useBackground(false);
  return (
    <section className={styles.wrapper}>
      <FaqCategory />
    </section>
  );
}

export default Faq;
