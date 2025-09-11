import { helmetProps } from '../../assets/helmet-props';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import FormCreateTeam from '../../components/UI/FormTeam/FormCreateTeam';

import useTitle from '../../hook/useTitle';

import styles from './TeamCreate.module.css';

/**
 * Страница создания команды.
 */
export default function TeamCreatePage() {
  useTitle('Создание команды');
  return (
    <div className={styles.wrapper}>
      <HelmetComponent {...helmetProps.TEAM_CREATE} />

      <FormCreateTeam isCreating={true} />
    </div>
  );
}
