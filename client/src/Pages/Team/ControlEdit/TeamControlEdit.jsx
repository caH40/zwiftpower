import { useParams } from 'react-router-dom';

import styles from './TeamControlEdit.module.css';

/**
 * Страница редактирования настроек команды. (Описание, изображения.)
 */
export default function TeamControlEditPage() {
  const { urlSlug } = useParams();

  return <div className={styles.wrapper}>TeamControlEdit</div>;
}
