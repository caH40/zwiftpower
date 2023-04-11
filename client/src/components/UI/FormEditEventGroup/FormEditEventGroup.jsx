import React from 'react';

import Button from '../Button/Button';

import styles from './FormEditEventGroup.module.css';
import SubGroup from './SubGroup';

function FormEditEventGroup({
  subGroup_0,
  subGroup_1,
  subGroup_2,
  subGroup_3,
  subGroup_4,
  setSubGroup_0,
  setSubGroup_1,
  setSubGroup_2,
  setSubGroup_3,
  setSubGroup_4,
  sendForm,
}) {
  return (
    <form className={styles.form} name="zwiftEvent">
      <SubGroup subGroup={subGroup_0} setSubGroup={setSubGroup_0} />
      <SubGroup subGroup={subGroup_1} setSubGroup={setSubGroup_1} />
      <SubGroup subGroup={subGroup_2} setSubGroup={setSubGroup_2} />
      <SubGroup subGroup={subGroup_3} setSubGroup={setSubGroup_3} />
      <SubGroup subGroup={subGroup_4} setSubGroup={setSubGroup_4} />
      <div className={styles.right}>
        <Button getClick={sendForm}>сохранить</Button>
      </div>
    </form>
  );
}

export default FormEditEventGroup;
