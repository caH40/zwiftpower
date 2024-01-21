import useTitle from '../../hook/useTitle';
import { useAd } from '../../hook/useAd';
import FaqCategory from '../../components/FaqBlock/FaqCategory';
import FaqIcons from '../../components/FaqBlock/FaqIcons';
import FaqTypesRace from '../../components/FaqBlock/FaqTypesRace';
import FaqVarious from '../../components/FaqBlock/FaqVarious';
import FaqJersey from '../../components/FaqJersey/FaqJersey';
import FaqNPVI from '../../components/FaqBlock/FaqNPVI';
import { HelmetFaq } from '../../components/Helmets/HelmetFaq';
import AdContainer from '../../components/AdContainer/AdContainer';

import styles from './Faq.module.css';

// рекламные блоки на странице
const adOverFooter = 15;
const adNumbers = [adOverFooter];

function Faq() {
  useTitle('Часто задаваемые вопросы');
  useAd(adNumbers, 'feed');

  return (
    <>
      <section className={styles.wrapper}>
        <HelmetFaq />
        <FaqVarious />
        <FaqCategory />
        <FaqIcons />
        <FaqNPVI />
        <FaqTypesRace />
        <FaqJersey />
      </section>
      <AdContainer number={adOverFooter} />
    </>
  );
}

export default Faq;
