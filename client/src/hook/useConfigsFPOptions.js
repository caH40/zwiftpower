import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGetAllFinishProtocol } from '../redux/features/api/finish-protocol/fetchFinishProtocol';
import { SelectOption } from '../utils/select-options';
import { resetConfigsFP } from '../redux/features/api/finish-protocol/finishProtocolSlice';

// На случай если данные не поступят с сервера.
const initData = {
  id: 1,
  value: 'classicGroup', // Необходимо иметь такой же name для configFP.
  name: 'Классическая с делением на группы',
  label: 'CG',
};

/**
 * Хук возвращает массив options для select выбора конфигурации финишного протокола.
 * Возвращаются конфигурации ФП организатора и дефолтные(общие).
 * @param {string} organizerId - _id Организатора заездов.
 */
export const useConfigsFPOptions = (organizerId) => {
  const { configsFP } = useSelector((state) => state.finishProtocol);
  const dispatch = useDispatch();

  // Запрос данных по конфигурация финишных протоколов на сервере.
  useEffect(() => {
    // Если не передан organizerId то не делать запрос на сервер.
    if (!organizerId) {
      return undefined;
    }

    dispatch(fetchGetAllFinishProtocol(organizerId));

    return () => {
      dispatch(resetConfigsFP());
    };
  }, [dispatch, organizerId]);

  // Генерировать массив options только при изменении configsFP.
  const options = useMemo(() => {
    if (!configsFP?.length) {
      return [initData];
    }

    const selectOption = new SelectOption();
    return selectOption.configsFinishProtocol(configsFP);
  }, [configsFP]);

  return options;
};
