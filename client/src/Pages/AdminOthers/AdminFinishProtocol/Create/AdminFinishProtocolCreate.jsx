import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchOrganizersPublic } from '../../../../redux/features/api/organizer_public/fetchOrganizersPublic';
import { resetOrganizersPublic } from '../../../../redux/features/api/organizer_public/organizersPublicSlice';
import FormAdminFinishProtocol from '../../../../components/UI/FormAdminFinishProtocol/FormAdminFinishProtocol';
import useTitle from '../../../../hook/useTitle';

const initialProtocol = {
  _id: null,
  organizer: '',
  name: '',
  displayName: '',
  description: '',
  isDefault: false,
  createdAt: '',
  updatedAt: '',
};

/**
 * Страница создания пакета конфигурации финишного протокола.
 */
export default function AdminConfigFPCreate() {
  useTitle('Создание финишного протокола');

  // Данные организаторов из хранилища редакс.
  const { organizers } = useSelector((state) => state.organizersPublic);
  const { state: stateFinishProtocol } = useSelector((state) => state.finishProtocol);

  const dispatch = useDispatch();

  // Запрос на получение списка организаторов.
  useEffect(() => {
    dispatch(fetchOrganizersPublic());

    return () => {
      dispatch(resetOrganizersPublic());
    };
  }, [dispatch]);
  return (
    <section>
      {/* Форма создания/редактирования конфигураций финишных протоколов */}
      {!!organizers?.length && (
        <FormAdminFinishProtocol
          configFP={initialProtocol}
          organizers={organizers.map((org) => ({
            id: org.id,
            value: org.id,
            name: org.name,
          }))}
          loading={stateFinishProtocol === 'loading'}
          isCreating={true}
        />
      )}
    </section>
  );
}
