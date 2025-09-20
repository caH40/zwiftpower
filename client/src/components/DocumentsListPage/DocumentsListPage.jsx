import { Link } from 'react-router-dom';

import GithubButtonUrl from '../UI/GithubButtonUrl/GithubButtonUrl';

import styles from './DocumentsListPage.module.css';

/**
 * @param {Object} props - Пропсы.
 * @param {{fileName:string,extension:string}[]} props.documents - Массив данных по документам.
 * @param {string} props.title - Заголовок.
 * @param {string} props.subtitle - Подзаголовок.
 * @param {string} props.sectionTitle
 * @param {string} props.sectionDescription
 * @param {string} props.type - Тип раздела (development, public, organizer).
 * @param {string} props.chapterType - Перевод type
  
 */
export default function DocumentsListPage({
  documents,
  title,
  subtitle,
  sectionTitle,
  sectionDescription,
  type,
  chapterType,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>💻</div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
          <p className={styles.sectionDescription}>{sectionDescription}</p>

          <div className={styles.grid}>
            {documents.map((doc) => {
              const [fileName, extension] = doc.fileName.split('.');
              return (
                <article key={fileName} className={styles.card}>
                  <Link
                    to={`/documents/${type}/${fileName}?extension=${extension}`}
                    className={styles.cardLink}
                  >
                    <div className={styles.cardHeader}>
                      <span className={styles.cardIcon}>📄</span>
                      <h3 className={styles.cardTitle}>{doc.title || fileName}</h3>
                    </div>
                    <p className={styles.cardDescription}>
                      Формат: {extension.toUpperCase()} • Раздел: {chapterType}
                    </p>
                    <div className={styles.cardAction}>
                      <span className={styles.actionText}>Изучить документацию</span>
                      <span className={styles.actionArrow}>→</span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.controlContainer}>
        <GithubButtonUrl href={'/documents'}>← К общему справочнику</GithubButtonUrl>
      </div>
    </div>
  );
}
