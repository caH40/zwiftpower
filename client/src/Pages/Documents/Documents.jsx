import { Link } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import { documentChapters } from '../../assets/documents';

import styles from './Index.module.css';

/**
 * Страница со списком разделов для всех документации сайта.
 */
export default function DocumentsPage() {
  useTitle('Документация и справочные материалы');

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>📚</div>
        <h1 className={styles.title}>Документация платформы</h1>
        <p className={styles.subtitle}>
          Полное руководство по использованию всех возможностей системы
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Разделы документации</h2>
          <p className={styles.sectionDescription}>
            Выберите интересующий раздел для получения подробной информации
          </p>

          <div className={styles.grid}>
            {documentChapters.map(({ type, label, icon, description }) => (
              <article key={type} className={styles.card}>
                <Link to={`/documents/${type}`} className={styles.cardLink}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardIcon}>{icon}</span>
                    <h3 className={styles.cardTitle}>{label}</h3>
                  </div>
                  <p className={styles.cardDescription}>{description}</p>
                  <div className={styles.cardAction}>
                    <span className={styles.actionText}>Открыть раздел</span>
                    <span className={styles.actionArrow}>→</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* <div className={styles.quickActions}>
          <h3 className={styles.quickActionsTitle}>Быстрый доступ</h3>
          <div className={styles.actionButtons}>
            <Link to="/documents/faq" className={styles.actionButton}>
              <span className={styles.actionButtonIcon}>❓</span>
              FAQ
            </Link>
            <Link to="/documents/api" className={styles.actionButton}>
              <span className={styles.actionButtonIcon}>🔌</span>
              API Docs
            </Link>
            <Link to="/documents/tutorials" className={styles.actionButton}>
              <span className={styles.actionButtonIcon}>🎓</span>
              Tutorials
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}
