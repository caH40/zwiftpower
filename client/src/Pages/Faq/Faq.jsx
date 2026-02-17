import useTitle from '../../hook/useTitle';
import FaqCategory from '../../components/FaqBlock/FaqCategory';
import FaqIcons from '../../components/FaqBlock/FaqIcons';
import FaqTypesRace from '../../components/FaqBlock/FaqTypesRace';
import FaqVarious from '../../components/FaqBlock/FaqVarious';
import FaqJersey from '../../components/FaqJersey/FaqJersey';
import FaqNPVI from '../../components/FaqBlock/FaqNPVI';
import { HelmetFaq } from '../../components/Helmets/HelmetFaq';
import FaqCategoryRS from '../../components/FaqBlock/FaqCategoryRS';

import styles from './Faq.module.css';

// рекламные блоки на странице
// const adOverFooter = 15;
// const adUnderHeader = 13;
// const adNumbers = [adOverFooter, adUnderHeader];

function Faq() {
  useTitle('Часто задаваемые вопросы');

  return (
    <>
      <section className={styles.wrapper}>
        <HelmetFaq />
        <FaqVarious />
        <FaqCategoryRS />
        <FaqJersey />
        <FaqIcons />
        <FaqNPVI />
        <FaqTypesRace />
        <FaqCategory />
      </section>
    </>
  );
}

export default Faq;
