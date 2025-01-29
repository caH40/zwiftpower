import { useResize } from '../../../hook/use-resize';
import IconTelegram from '../../icons/IconTelegram';
import { serverFront } from '../../../config/environment';

import styles from './Footer.module.css';

const mapSite = [
  { id: 0, name: 'Анонсы ближайших заездов', href: serverFront },
  { id: 1, name: 'Расписание всех заездов', href: `${serverFront}/race/schedule` },
  { id: 2, name: 'Результаты заездов', href: `${serverFront}/race/results` },
  { id: 3, name: 'Организаторы заездов', href: `${serverFront}/organizers` },
  { id: 4, name: 'Серии заездов', href: `${serverFront}/race/series` },
  { id: 5, name: 'Статистика', href: `${serverFront}/race/statistics/main` },
  { id: 6, name: 'Лидеры мощности', href: `${serverFront}/race/statistics/leaders/male` },
  { id: 7, name: 'Райдеры по FTP', href: `${serverFront}/race/statistics/riders-ftp` },
  { id: 8, name: 'Догонялки', href: `${serverFront}/race/series/catchup/2023` },
  { id: 9, name: 'Трансляции', href: `${serverFront}/streams` },
  { id: 10, name: 'Поиск райдера', href: `${serverFront}/riders` },
  { id: 11, name: 'Часто задаваемые вопросы', href: `${serverFront}/faq` },
];

const usefulLinks = [
  { id: 0, name: 'zwiftpower.com', href: 'https://zwiftpower.com' },
  { id: 1, name: 'zwifterbikes.com', href: 'https://zwifterbikes.web.app/' },
  { id: 2, name: 'whatsonzwift.com', href: 'https://whatsonzwift.com' },
  { id: 3, name: 'zwiftinsider.com', href: 'https://zwiftinsider.com' },
  { id: 4, name: 'zwifthub.com', href: 'https://zwifthub.com' },
  { id: 5, name: 'zwiftgopher.com', href: 'https://zwiftgopher.com' },
];

const documentsLegal = [
  { id: 0, name: 'Политика конфиденциальности', href: `${serverFront}/legal/privacy-policy` },
  { id: 1, name: 'Пользовательское соглашение', href: `${serverFront}/legal/terms-of-use` },
];

const usefulLinksWithIcon = [
  {
    id: 0,
    name: 'KOM-on группа',
    href: 'https://t.me/komon_zwift',
    icon: <IconTelegram squareSize={20} />,
  },
  {
    id: 1,
    name: 'KOM-on инфо',
    href: 'https://t.me/komon_race_info',
    icon: <IconTelegram squareSize={20} />,
  },
];

function Footer() {
  const { isScreenLg: lg } = useResize();
  return (
    <footer className={styles.footer}>
      <div className={styles.block__links}>
        <div className={styles.block}>
          <h3 className={styles.title}>Техническая поддержка:</h3>

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

        {/* Блок документов */}
        <div className={styles.block}>
          <h3 className={styles.title}>Документы:</h3>

          <div className={styles.column}>
            {documentsLegal.map((page) => (
              <a className={styles.link} href={page.href} key={page.id}>
                {page.name}
              </a>
            ))}
          </div>
        </div>

        {lg && (
          <div className={styles.block}>
            <h3 className={styles.title}>Карта сайта:</h3>

            <div className={styles.column}>
              {mapSite.map((page) => (
                <a className={styles.link} href={page.href} key={page.id}>
                  {page.name}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className={styles.block}>
          <h3 className={styles.title}>Тематические ссылки:</h3>
          <div className={styles.column}>
            {usefulLinksWithIcon.map((page) => (
              <a
                className={styles.link__icon}
                href={page.href}
                target="_blank"
                rel="noreferrer"
                key={page.id}
              >
                {page.icon}
                <span>{page.name}</span>
              </a>
            ))}

            {usefulLinks.map((page) => (
              <a
                className={styles.link}
                href={page.href}
                target="_blank"
                rel="noreferrer"
                key={page.id}
              >
                {page.name}
              </a>
            ))}
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
