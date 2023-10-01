import React, { useState } from 'react';

import Button from '../../../UI/Button/Button';
import SimpleInput from '../../../UI/SimpleInput/SimpleInput';

import styles from './FormRequest.module.css';

function FormRequest({ name, setState }) {
  const [localId, setLocalId] = useState({ id: 0 });
  return (
    <form className={styles.form} name="requestData">
      <SimpleInput
        name={name}
        state={localId}
        setState={setLocalId}
        property="id"
        type="number"
      />
      <div className={styles.right}>
        <Button
          getClick={() => {
            setState(localId);
            setLocalId({ id: 0 });
          }}
        >
          получить
        </Button>
      </div>
    </form>
  );
}

export default FormRequest;
