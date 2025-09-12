import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import { fetchTeamMember } from '../../../redux/features/api/team-member/fetchTeamMember';

import styles from './TeamMembers.module.css';

export default function TeamMembersPage() {
  const { urlSlug } = useParams();
  const { teamMembers } = useSelector((state) => state.teamMember);

  const dispatch = useDispatch();

  const join = () => {
    console.log(`Подача заявки на присоедининие к команде ${urlSlug}`);
  };

  useEffect(() => {
    dispatch(fetchTeamMember({ urlSlug }));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.control}>
        <Button getClick={join}>Присоединиться</Button>
      </div>

      <section className={styles.members}></section>
    </div>
  );
}
