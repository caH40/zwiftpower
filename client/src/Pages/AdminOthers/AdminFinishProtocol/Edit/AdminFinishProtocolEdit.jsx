import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchOrganizersPublic } from '../../../../redux/features/api/organizer_public/fetchOrganizersPublic';
import { resetOrganizersPublic } from '../../../../redux/features/api/organizer_public/organizersPublicSlice';
import FormAdminFinishProtocol from '../../../../components/UI/FormAdminFinishProtocol/FormAdminFinishProtocol';
import useTitle from '../../../../hook/useTitle';
import { fetchGetAllFinishProtocol } from '../../../../redux/features/api/finish-protocol/fetchFinishProtocol';
import { resetConfigsFP } from '../../../../redux/features/api/finish-protocol/finishProtocolSlice';
import TableConfigsFP from '../../../../components/Tables/TableConfigsFP/TableConfigsFP';
import { useFPEditActions } from '../../../../hook/useFPEditActions';

/**
 * Страница редактирования пакета конфигурации финишного протокола.
 */
export default function AdminConfigFPEdit() {
  const [configFP, setConfigFP] = useState(null);

  // триггер повторного запроса данных измененного финишного протокола.
  const [trigger, setTrigger] = useState(false);

  useTitle('Редактирование финишного протокола');

  // Данные организаторов из хранилища редакс.
  const { organizers } = useSelector((state) => state.organizersPublic);

  const { configsFP, state: stateFinishProtocol } = useSelector(
    (state) => state.finishProtocol
  );

  const dispatch = useDispatch();

  // Запрос на получение списка организаторов.
  useEffect(() => {
    dispatch(fetchOrganizersPublic());
    dispatch(fetchGetAllFinishProtocol());
    setConfigFP(null);

    return () => {
      dispatch(resetOrganizersPublic());
      dispatch(resetConfigsFP());
    };
  }, [trigger]);

  const { deleteConfigFP, editConfigFP } = useFPEditActions({
    configsFP,
    setConfigFP,
    setTrigger,
  });

  return (
    <section>
      {!!configsFP?.length && (
        <TableConfigsFP
          configsFP={configsFP}
          editConfigFP={editConfigFP}
          deleteConfigFP={deleteConfigFP}
        />
      )}

      {/* Форма создания/редактирования конфигураций финишных протоколов */}
      {!!organizers?.length && configFP && (
        <FormAdminFinishProtocol
          configFP={configFP}
          organizers={organizers.map((org) => ({
            id: org.id,
            value: org.id,
            name: org.name,
          }))}
          loading={stateFinishProtocol === 'loading'}
          isCreating={false}
          setTrigger={setTrigger}
        />
      )}
    </section>
  );
}
