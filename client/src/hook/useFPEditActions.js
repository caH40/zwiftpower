import { useDispatch } from 'react-redux';

import { getAlert } from '../redux/features/alertMessageSlice';
import { fetchDeleteFinishProtocol } from '../redux/features/api/finish-protocol/fetchFinishProtocol';

export const useFPEditActions = ({ configsFP, setConfigFP, setTrigger }) => {
  const dispatch = useDispatch();
  // Обработчики нажатий кнопки редактирования.
  const editConfigFP = (configFPId) => {
    const configForEdit = configsFP.find((elm) => elm._id === configFPId);
    if (!configForEdit) {
      dispatch(
        getAlert({
          message:
            'Не найден выбранный конфиг в полученном списке конфигурайи финишных протоколов!',
          type: 'error',
          isOpened: true,
        })
      );
      return;
    }
    setConfigFP(configForEdit);
  };

  // Обработчики нажатий кнопки удаления.
  const deleteConfigFP = async (configFPId, name) => {
    try {
      const confirmedDeleting = window.confirm(
        `Вы действительно хотите удалить конфигурацию финишного протокола с названием: "${name}"?`
      );

      if (!confirmedDeleting) {
        dispatch(
          getAlert({
            message: 'Отмена удаления!',
            type: 'warning',
            isOpened: true,
          })
        );

        return;
      }

      const res = await dispatch(fetchDeleteFinishProtocol({ configFPId })).unwrap();

      setTrigger((prev) => !prev);

      dispatch(
        getAlert({
          message: res.message || 'Неизвестная ошибка на сервере!',
          type: 'success',
          isOpened: true,
        })
      );
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  return { deleteConfigFP, editConfigFP };
};
