import { useSelector } from 'react-redux';

import Button from '../../../UI/Button/Button';

import SubGroup from './SubGroup';
import styles from './FormEditEventGroup.module.css';

function FormEditEventGroup({ isCreating, sendForm }) {
  const {
    eventSubgroup_1,
    eventSubgroup_2,
    eventSubgroup_3,
    eventSubgroup_4,
    eventSubgroup_5,
  } = useSelector((state) => state.eventParams);

  return (
    <form className={styles.form} name="zwiftEvent">
      <SubGroup subGroup={eventSubgroup_1} groupNumber={1} isCreating={isCreating} />
      <SubGroup subGroup={eventSubgroup_2} groupNumber={2} isCreating={isCreating} />
      <SubGroup subGroup={eventSubgroup_3} groupNumber={3} isCreating={isCreating} />
      <SubGroup subGroup={eventSubgroup_4} groupNumber={4} isCreating={isCreating} />
      <SubGroup subGroup={eventSubgroup_5} groupNumber={5} isCreating={isCreating} />
      <div className={styles.right}>
        <Button getClick={sendForm}>сохранить</Button>
      </div>
    </form>
  );
}

export default FormEditEventGroup;
