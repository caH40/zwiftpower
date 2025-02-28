import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchOrganizersPublic } from '../../../redux/features/api/organizer_public/fetchOrganizersPublic';
import { resetOrganizersPublic } from '../../../redux/features/api/organizer_public/organizersPublicSlice';
import FormAdminFinishProtocol from '../../../components/UI/FormAdminFinishProtocol/FormAdminFinishProtocol';
import useTitle from '../../../hook/useTitle';

import styles from './AdminFinishProtocol.module.css';

const initialProtocol = {
  _id: null,
  organizer: '1d4few434re',
  name: '',
  displayName: '',
  description: '',
  isDefault: false,
  createdAt: '',
  updatedAt: '',
};

/**
 * Страница редактирования пакета конфигурации финишного протокола.
 */
export default function AdminFinishProtocol() {
  // триггер повторного запроса данных измененного финишного протокола.
  const [trigger, setTrigger] = useState(false);
  useTitle('Финишный протокол');
  // Данные организаторов из хранилища редакс.
  const { organizers } = useSelector((state) => state.organizersPublic);
  const { state: stateFinishProtocol } = useSelector((state) => state.finishProtocol);

  const dispatch = useDispatch();

  // Запрос на получение списка организаторов.
  useEffect(() => {
    dispatch(fetchOrganizersPublic());

    return () => dispatch(resetOrganizersPublic());
  }, [trigger]);
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Редактирование пакетов конфигурации финишного протокола</h2>
      {!!organizers?.length && (
        <FormAdminFinishProtocol
          protocol={initialProtocol}
          organizers={organizers.map((org) => ({
            id: org.id,
            value: org.id,
            name: org.name,
          }))}
          loading={stateFinishProtocol === 'loading'}
          isCreating={true}
          setTrigger={setTrigger}
        />
      )}
    </section>
  );
}
