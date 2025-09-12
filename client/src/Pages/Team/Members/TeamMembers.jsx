import { useParams } from 'react-router-dom';

import Button from '../../../components/UI/Button/Button';

import styles from './TeamMembers.module.css';

export default function TeamMembersPage() {
  const { urlSlug } = useParams();
  const join = () => {
    console.log(`Подача заявки на присоедининие к команде ${urlSlug}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.control}>
        <Button getClick={join}>Присоединиться</Button>
      </div>
    </div>
  );
}
