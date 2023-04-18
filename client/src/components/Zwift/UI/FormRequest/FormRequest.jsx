import React from 'react';

import Button from '../../../UI/Button/Button';
import SimpleInput from '../../../UI/SimpleInput/SimpleInput';

import styles from './FormRequest.module.css';

function FormRequest({ name, state, setState, sendForm }) {
  return (
    <form className={styles.form} name="requestData">
      <SimpleInput name={name} state={state} setState={setState} property="id" type="number" />
      <div className={styles.right}>
        <Button getClick={sendForm}>получить</Button>
      </div>
    </form>
  );
}

export default FormRequest;
