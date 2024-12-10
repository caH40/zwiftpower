import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../../UI/Button/Button';
import SimpleInput from '../../../UI/SimpleInput/SimpleInput';
import { setEventId } from '../../../../redux/features/api/event-create/eventCreateSlice';

import styles from './FormRequest.module.css';

function FormRequest({ name, reducer, type, organizerId, disabled }) {
  const [localId, setLocalId] = useState({ id: 0 });
  const dispatch = useDispatch();
  return (
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
            dispatch(
              reducer ? reducer(localId.id) : setEventId({ eventId: localId.id, organizerId })
            );
            setLocalId({ id: 0 });
          }}
          disabled={disabled}
        >
          получить
        </Button>
      </div>
    </form>
  );
}

export default FormRequest;
