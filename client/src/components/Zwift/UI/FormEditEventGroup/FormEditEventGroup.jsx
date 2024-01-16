import React from 'react';
import { useSelector } from 'react-redux';

import Button from '../../../UI/Button/Button';

import SubGroup from './SubGroup';
import styles from './FormEditEventGroup.module.css';

function FormEditEventGroup({ sendForm }) {
  const {
    eventSubgroup_1,
    eventSubgroup_2,
    eventSubgroup_3,
    eventSubgroup_4,
    eventSubgroup_5,
  } = useSelector((state) => state.eventParams);
  return (
    <form className={styles.form} name="zwiftEvent">
      <SubGroup subGroup={eventSubgroup_1} index={1} />
      <SubGroup subGroup={eventSubgroup_2} index={2} />
      <SubGroup subGroup={eventSubgroup_3} index={3} />
      <SubGroup subGroup={eventSubgroup_4} index={4} />
      <SubGroup subGroup={eventSubgroup_5} index={5} />
      <div className={styles.right}>
        <Button getClick={sendForm}>сохранить</Button>
      </div>
    </form>
  );
}

export default FormEditEventGroup;
