import React from 'react';

import { useResize } from '../../../hook/use-resize';
import IconTelegram from '../../icons/IconTelegram';

import styles from './Footer.module.css';

const server = import.meta.env.VITE_SERVER_FRONT;

function Footer() {
  const { isScreenLg: lg } = useResize();
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <h3 className={styles.title}>Техническая поддержка:</h3>
          <div className={styles.box}>
            <div className={styles.column}>
              <a className={styles.link} href="mailto:support@zwiftpower.ru">
                support@zwiftpower.ru
              </a>
              <a
                className={styles.link__icon}
                href="https://t.me/zwiftpower"
                target="_blank"
                rel="noreferrer"
              >
                <IconTelegram squareSize={20} /> Группа разработки
              </a>
            </div>
          </div>
        </div>
        {lg && (
          <div className={styles.block}>
            <h3 className={styles.title}>Карта сайта:</h3>
            <div className={styles.box}>
              <div className={styles.column}>
                <a className={styles.link} href={`${server}`}>
                  Анонсы ближайших заездов
                </a>
                <a className={styles.link} href={`${server}/race/schedule`}>
                  Расписание всех заездов
                </a>
                <a className={styles.link} href={`${server}/race/results`}>
                  Результаты заездов
                </a>
              </div>
              <div className={styles.column}>
                <a className={styles.link} href={`${server}/race/series`}>
                  Серии заездов
                </a>
                <a className={styles.link} href={`${server}/race/statistics`}>
                  Статистика
                </a>
                <a className={styles.link} href={`${server}/faq`}>
                  Часто задаваемые вопросы
                </a>
              </div>
              <div className={styles.column}>
                <a className={styles.link} href={`${server}/race/series/catchup`}>
                  Догонялки
                </a>
              </div>
            </div>
          </div>
        )}
        <div className={styles.block}>
          <h3 className={styles.title}>Тематические ссылки:</h3>
          <div className={styles.box}>
            <div className={styles.column}>
              <div className={styles.box__icon}>
                <a
                  className={styles.link__icon}
                  href="https://t.me/komon_zwift"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconTelegram squareSize={20} /> KOM-on группа
                </a>
              </div>

              <a
                className={styles.link__icon}
                href="https://t.me/komon_race_info"
                target="_blank"
                rel="noreferrer"
              >
                <IconTelegram squareSize={20} /> KOM-on инфо
              </a>
            </div>
            <div className={styles.column}>
              <a
                className={styles.link}
                href="https://zwift.com"
                target="_blank"
                rel="noreferrer"
              >
                zwift.com
              </a>
              <a
                className={styles.link}
                href="https://zwiftpower.com"
                target="_blank"
                rel="noreferrer"
              >
                zwiftpower.com
              </a>
              <a
                className={styles.link}
                href="https://zwifterbikes.web.app/"
                target="_blank"
                rel="noreferrer"
              >
                zwifterbikes
              </a>
            </div>
            <div className={styles.column}>
              <a
                className={styles.link}
                href="https://whatsonzwift.com"
                target="_blank"
                rel="noreferrer"
              >
                whatsonzwift.com
              </a>
              <a
                className={styles.link}
                href="https://zwiftinsider.com"
                target="_blank"
                rel="noreferrer"
              >
                zwiftinsider.com
              </a>
              <a
                className={styles.link}
                href="https://zwifthub.com"
                target="_blank"
                rel="noreferrer"
              >
                zwifthub.com
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <span>Copyright © Berezhnev A., 2023</span>
      </div>
    </footer>
  );
}

export default Footer;
