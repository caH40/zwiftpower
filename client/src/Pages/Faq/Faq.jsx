import useTitle from '../../hook/useTitle';
import FaqCategory from '../../components/FaqBlock/FaqCategory';
import FaqIcons from '../../components/FaqBlock/FaqIcons';
import FaqTypesRace from '../../components/FaqBlock/FaqTypesRace';
import FaqVarious from '../../components/FaqBlock/FaqVarious';
import FaqJersey from '../../components/FaqJersey/FaqJersey';
import FaqNPVI from '../../components/FaqBlock/FaqNPVI';
import { HelmetFaq } from '../../components/Helmets/HelmetFaq';

import styles from './Faq.module.css';

function Faq() {
  useTitle('Часто задаваемые вопросы');

  return (
    <section className={styles.wrapper}>
      <HelmetFaq />
      <FaqVarious />
      <FaqCategory />
      <FaqIcons />
      <FaqNPVI />
      <FaqTypesRace />
      <FaqJersey />
    </section>
  );
}

export default Faq;
