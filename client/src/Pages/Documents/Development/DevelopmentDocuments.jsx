import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchDocuments } from '../../../redux/features/api/documents/fetchDocuments';
import { resetDocuments } from '../../../redux/features/api/documents/documentsSlice';
import useTitle from '../../../hook/useTitle';
import GithubButtonUrl from '../../../components/UI/GithubButtonUrl/GithubButtonUrl';

import styles from '../Index.module.css';

export default function DevelopmentDocumentsPage() {
  useTitle('Документация разработчика - Список файлов');
  const { documents } = useSelector((state) => state.documents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDocuments({ type: 'development' })).unwrap();

    return () => dispatch(resetDocuments());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>💻</div>
        <h1 className={styles.title}>Техническая документация</h1>
        <p className={styles.subtitle}>
          Архитектура системы, API reference и руководства для разработчиков
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Технические документы</h2>
          <p className={styles.sectionDescription}>
            Изучите внутреннее устройство системы и API для интеграций
          </p>

          <div className={styles.grid}>
            {documents.map((doc) => {
              const [fileName, extension] = doc.fileName.split('.');
              return (
                <article key={fileName} className={styles.card}>
                  <Link
                    to={`/documents/development/${fileName}?extension=${extension}`}
                    className={styles.cardLink}
                  >
                    <div className={styles.cardHeader}>
                      <span className={styles.cardIcon}>📄</span>
                      <h3 className={styles.cardTitle}>{doc.title || fileName}</h3>
                    </div>
                    <p className={styles.cardDescription}>
                      Формат: {extension.toUpperCase()} • Раздел: разработка
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
