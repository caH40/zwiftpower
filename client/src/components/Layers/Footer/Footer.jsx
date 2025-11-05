import IconTelegram from '../../icons/IconTelegram';

import styles from './Footer.module.css';
import { documentsLegal, mapSite, usefulLinks, usefulLinksWithIcon } from './navigate-items';

function Footer() {
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
