import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../../UI/Button/Button';
import SimpleInput from '../../../UI/SimpleInput/SimpleInput';
import { setEventId } from '../../../../redux/features/api/event-create/eventCreateSlice';

import styles from './FormRequest.module.css';

function FormRequest({ name, reducer, type }) {
  const [localId, setLocalId] = useState({ id: 0 });
  const dispatch = useDispatch();
  return (
    <>
      <h2 className={styles.title}>Поиск клуба по id</h2>
      <div className={styles.group}>
        <form className={styles.form} name="requestData">
          <SimpleInput
            name={name}
            state={localId}
            setState={setLocalId}
            property="id"
            type={type === 'text' ? 'text' : 'number'}
          />
          <div className={styles.right}>
            <Button
              getClick={() => {
                dispatch(reducer ? reducer(localId.id) : setEventId(localId.id));
                setLocalId({ id: 0 });
              }}
            >
              получить
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormRequest;
