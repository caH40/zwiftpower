import React from 'react';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import FaqCategory from '../../components/FaqBlock/FaqCategory';
import FaqIcons from '../../components/FaqBlock/FaqIcons';
import FaqTypesRace from '../../components/FaqBlock/FaqTypesRace';
import FaqVarious from '../../components/FaqBlock/FaqVarious';

import styles from './Faq.module.css';

function Faq() {
  useTitle('Часто задаваемые вопросы');
  useBackground(false);
  return (
    <section className={styles.wrapper}>
      <FaqVarious />
      <FaqCategory />
      <FaqIcons />
      <FaqTypesRace />
    </section>
  );
}

export default Faq;
