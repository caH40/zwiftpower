import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteCurrentResult } from '../../api/result';
import { getResultStage } from '../../api/stage';
import TableEditStageResults from '../../components/Tables/TableEditStageResults/TableEditStageResults';
import Button from '../../components/UI/Button/Button';
import ButtonLink from '../../components/UI/ButtonLink/ButtonLink';
import useTitle from '../../hook/useTitle';
import { getAlert } from '../../redux/features/alertMessageSlice';

import styles from './EditResults.module.css';

function EditResults() {
  const [results, setResults] = useState([]);
  const [update, setUpdate] = useState(false);
  useTitle('Редактирование данных этапа');

  const { stageId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getResultStage(stageId).then((data) => {
      setResults(data.data?.results);
    });
  }, [stageId, update]);

  const getClick = () => navigate(-1);

  const deleteResult = (resultId, riderName) => {
    const confirm = window.confirm(
      `Вы действительно хотите удалить результат райдера ${riderName}?`
    );
    if (!confirm)
      return dispatch(
        getAlert({
          message: `Отмена удаления результат райдера ${riderName}`,
          type: 'warning',
          isOpened: true,
        })
      );
    deleteCurrentResult(resultId)
      .then((response) => {
        dispatch(getAlert({ message: response.data.message, type: 'success', isOpened: true }));
      })
      .catch((error) =>
        dispatch(
          getAlert({ message: 'Ошибка при удалении результата', type: 'error', isOpened: true })
        )
      )
      .finally(() => setUpdate((prev) => !prev));
    return false;
  };
  return (
    <>
      <h3 className="titlePage-3">Редактирование данных заезда</h3>
      <div className={styles.right}>
        <ButtonLink
          to={`/edit/stage/${stageId}/rider-add`}
          toolTip="Добавление результата райдера который не попал в общий протокол Этапа"
        >
          Добавить
        </ButtonLink>
      </div>
      <TableEditStageResults
        results={results}
        setUpdate={setUpdate}
        deleteResult={deleteResult}
      />
      <Button getClick={getClick}>назад</Button>
    </>
  );
}

export default EditResults;
