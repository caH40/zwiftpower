import { Link } from 'react-router-dom';

import { documentChapters } from '../../assets/documents';
import { useUserRole } from '../../hook/useUserRole';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import { helmetProps } from '../../assets/helmet-props';
import useTitle from '../../hook/useTitle';

import styles from './Index.module.css';

/**
 * Страница со списком разделов для всех документации сайта.
 */
export default function DocumentationPage() {
  useTitle('Документация и справочные материалы');
  const { isAdmin, isOrganizer } = useUserRole();

  const roles = getRoles({ isAdmin, isOrganizer });

  const availableChapters = documentChapters.filter(({ permissions }) =>
    permissions.some((p) => roles.includes(p))
  );

  return (
    <>
      <HelmetComponent {...helmetProps.DOCUMENTATION} />

      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>📚</div>
          <h1 className={styles.title}>Документация сервисов</h1>
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
              {availableChapters.map(({ type, label, icon, description }) => (
                <article key={type} className={styles.card}>
                  <Link to={`/documentation/${type}`} className={styles.cardLink}>
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
        </div>
      </div>
    </>
  );
}

function getRoles({ isAdmin, isOrganizer }) {
  const roles = ['all'];
  if (isAdmin) roles.push('admin');
  if (isOrganizer) roles.push('organizer');
  return roles;
}
