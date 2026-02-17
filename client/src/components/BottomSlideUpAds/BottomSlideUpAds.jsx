import { useEffect, useState, useRef } from 'react';
import cn from 'classnames';

import AdSmallBanner from '../AdSmallBanner/AdSmallBanner';

import styles from './BottomSlideUpAds.module.css';

const goprotect_1 = {
  name: 'goprotect_1',
  imgSrc: '/images/ads/goprotect_1.jpg',
  content: {
    title: 'Спортивная страховка',
    text: [
      'Спортивная страховка для тех, кто занимается велоспортом. Оформление онлайн за 3 минуты.',
      'Полис для соревнований и тренировок по всей России.',
      'Февральская скидка 8% по промокоду: GPSPORT',
    ],
  },
  advertiserData: {
    name: 'ООО «Гоу Протект»',
    inn: '7811572690',
    site: 'https://www.goprotect.ru',
    erid: '2VtzqxfBD9D',
  },
  distributorData: {
    name: 'Бережнев Александр Викторович',
    inn: '263212036872',
  },
  link: 'https://www.goprotect.ru/p10532?erid=2VtzqxfBD9D',
  ageRestriction: '18+',
};

/**
 * Всплывающий снизу блок с рекламными баннерами.
 */
export default function BottomSlideUpAds({ ads }) {
  const [isClosed, setIsClosed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const closeSlider = () => {
    if (isClosing || isClosed) return;

    setIsClosing(true);

    setTimeout(() => {
      setIsClosed(true);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div
      ref={wrapperRef}
      className={cn(styles.wrapper, {
        [styles.open]: isVisible && !isClosed,
        [styles.closing]: isClosing,
        [styles.closed]: isClosed,
      })}
      role="dialog"
      aria-label="Рекламный баннер"
      aria-hidden={isClosed}
    >
      <button
        className={styles.closeElement}
        onClick={closeSlider}
        aria-label="Закрыть рекламный баннер"
        disabled={isClosing}
      >
        <svg
          width="60"
          height="24"
          viewBox="0 0 60 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M10.4851 6.05971C11.3754 2.49838 14.5753 0 18.2462 0H41.7538C45.4247 0 48.6246 2.49838 49.5149 6.05971L53.2425 20.9701C53.6877 22.7508 55.2876 24 57.1231 24H60H0H2.87689C4.71237 24 6.3123 22.7508 6.75746 20.9701L10.4851 6.05971Z"
            fill="#eeeeeee5"
          />
          <path
            className={styles.cross}
            d="M24.7929 6.79289C24.4024 7.18342 24.4024 7.81658 24.7929 8.20711L28.5858 12L24.7929 15.7929C24.4024 16.1834 24.4024 16.8166 24.7929 17.2071C25.1834 17.5976 25.8166 17.5976 26.2071 17.2071L30 13.4142L33.7929 17.2071C34.1834 17.5976 34.8166 17.5976 35.2071 17.2071C35.5976 16.8166 35.5976 16.1834 35.2071 15.7929L31.4142 12L35.2071 8.20711C35.5976 7.81658 35.5976 7.18342 35.2071 6.79289C34.8166 6.40237 34.1834 6.40237 33.7929 6.79289L30 10.5858L26.2071 6.79289C25.8166 6.40237 25.1834 6.40237 24.7929 6.79289Z"
            fill="#000000"
          />
        </svg>
      </button>

      <AdSmallBanner {...goprotect_1} layout="horizontal" />
      <img
        src="/images/ads/600х90._drive_new_cardgif.gif"
        alt="t-bank ad"
        style={{ height: '120px' }}
      />
    </div>
  );
}
