import { useSelector } from 'react-redux';

import Button from '../../../UI/Button/Button';

import SubGroup from './SubGroup';
import styles from './FormEditEventGroup.module.css';

function FormEditEventGroup({ isCreating, sendForm }) {
  const {
    eventSubgroup_1: g_1,
    eventSubgroup_2: g_2,
    eventSubgroup_3: g_3,
    eventSubgroup_4: g_4,
    eventSubgroup_5: g_5,
  } = useSelector((state) => state.eventParams);

  return (
    <form className={styles.form} name="zwiftEvent">
      {g_1 && <SubGroup subGroup={g_1} groupNumber={1} isCreating={isCreating} />}
      {g_2 && <SubGroup subGroup={g_2} groupNumber={2} isCreating={isCreating} />}
      {g_3 && <SubGroup subGroup={g_3} groupNumber={3} isCreating={isCreating} />}
      {g_4 && <SubGroup subGroup={g_4} groupNumber={4} isCreating={isCreating} />}
      {g_5 && <SubGroup subGroup={g_5} groupNumber={5} isCreating={isCreating} />}
      <div className={styles.right}>
        <Button getClick={sendForm}>сохранить</Button>
      </div>
    </form>
  );
}

export default FormEditEventGroup;
