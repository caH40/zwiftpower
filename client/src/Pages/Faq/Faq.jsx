import useTitle from '../../hook/useTitle';
import FaqCategory from '../../components/FaqBlock/FaqCategory';
import FaqIcons from '../../components/FaqBlock/FaqIcons';
import FaqTypesRace from '../../components/FaqBlock/FaqTypesRace';
import FaqVarious from '../../components/FaqBlock/FaqVarious';
import FaqJersey from '../../components/FaqJersey/FaqJersey';

import styles from './Faq.module.css';

function Faq() {
  useTitle('Часто задаваемые вопросы');

  return (
    <section className={styles.wrapper}>
      <FaqVarious />
      <FaqCategory />
      <FaqIcons />
      <FaqTypesRace />
      <FaqJersey />
    </section>
  );
}

export default Faq;
