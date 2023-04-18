import React from 'react';
import { useSelector } from 'react-redux';

import Button from '../../../UI/Button/Button';

import SubGroup from './SubGroup';
import styles from './FormEditEventGroup.module.css';

// import SubGroup from './SubGroup';

function FormEditEventGroup({ sendForm }) {
  const { eventSubgroup_0 } = useSelector((state) => state.eventParams);
  return (
    <form className={styles.form} name="zwiftEvent">
      <SubGroup subGroup={eventSubgroup_0} index={0} />
      {/* <SubGroup subGroup={subGroup_1} setSubGroup={setSubGroup_1} />
      <SubGroup subGroup={subGroup_2} setSubGroup={setSubGroup_2} />
      <SubGroup subGroup={subGroup_3} setSubGroup={setSubGroup_3} />
      <SubGroup subGroup={subGroup_4} setSubGroup={setSubGroup_4} /> */}
      <div className={styles.right}>
        <Button getClick={sendForm}>сохранить</Button>
      </div>
    </form>
  );
}

export default FormEditEventGroup;
