import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { putGeneralPoints } from '../../api/general';
import TableStages from '../../components/Tables/Stages/TableStages';
import Button from '../../components/UI/Button/Button';
import useTitle from '../../hook/useTitle';
import { getAlert } from '../../redux/features/alertMessageSlice';

import styles from './Edit.module.css';

const EditStageList = () => {
  useTitle('Редактирование данных этапа');
  const { seriesId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => navigate(-1);

  const updateGeneralPoints = () =>
    putGeneralPoints(seriesId)
      .then((response) =>
        dispatch(getAlert({ message: response.data.message, type: 'success', isOpened: true }))
      )
      .catch((error) =>
        dispatch(
          getAlert({
            message:
              error.response.data?.message ||
              'Ошибка при обновлении очков генеральной квалификации',
            type: 'error',
            isOpened: true,
          })
        )
      );

  return (
    <div>
      <h3 className={styles.title}>Этапы серии</h3>
      <TableStages seriesId={seriesId} />
      <div className={styles.box__buttons}>
        <Button getClick={goBack}>назад</Button>
        <Button
          getClick={updateGeneralPoints}
          toolTip="Обновляются очки в генеральной квалификации 
					во всех этапах серии. Необходимо запускать после изменения 
					категории райдеру, штрафа, дисквалификации."
        >
          Обновить генерал
        </Button>
      </div>
    </div>
  );
};

export default EditStageList;
