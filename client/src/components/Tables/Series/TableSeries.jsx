import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getSeries, postDeleteSeries } from '../../../api/series';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import Button from '../../UI/Button/Button';
import ButtonLink from '../../UI/ButtonLink/ButtonLink';
import ClearTbody from '../ClearTbody/ClearTbody';
import styles from '../Table.module.css';

function TableSeries({ target }) {
  const [series, setSeries] = useState([]);
  const [update, setUpdate] = useState(false);

  const isStage = target === 'stage';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myLink = (url) => (isStage ? navigate(`/edit/stage/${url}`) : '');

  useEffect(() => {
    getSeries().then((data) => setSeries(data.data.series));
  }, [update]);

  const deleteStage = (seriesId) => {
    const confirm = window.confirm(
      `Вы действительно хотите удалить Series №${seriesId}? 
			Будут удалены все этапы серии и все результаты соответствующих этапов!`
    );
    if (!confirm)
      return dispatch(
        getAlert({
          message: `Отмена удаления Series №${seriesId}`,
          type: 'warning',
          isOpened: true,
        })
      );
    postDeleteSeries(seriesId)
      .then((data) => {
        setSeries(data.data.series);
        dispatch(
          getAlert({
            message: data.data.message,
            type: 'success',
            isOpened: true,
          })
        );
      })
      .catch((error) =>
        dispatch(
          getAlert({
            message: 'Ошибка при удалении Series!',
            type: 'error',
            isOpened: true,
          })
        )
      )
      .finally(() => setUpdate((prev) => !prev));
    return false;
  };

  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <caption>Series</caption>
      <thead>
        <tr>
          <th>#</th>
          <th>Название</th>
          <th>Организатор</th>
          <th>Начало</th>
          <th>Завершилась</th>
          <th>Тип</th>
          <th>Количество этапов</th>
          {isStage ? (
            ''
          ) : (
            <>
              <th>Редактировать</th>
              <th>Удалить</th>
            </>
          )}
        </tr>
      </thead>
      {series?.length ? (
        <tbody>
          {series.map((seriesOne, index) => {
            const finished = seriesOne.isFinished.toString();
            const classFinished = `${styles.boxValue} ${
              finished === 'true' ? styles.success : styles.error
            }`;
            return (
              <tr
                className={isStage ? styles.trLink : ''}
                key={seriesOne._id}
                onClick={() => myLink(seriesOne._id)}
              >
                <th scope="row">{index + 1}</th>
                <td>{seriesOne.name}</td>
                <td>{seriesOne.organizer}</td>
                <td>{new Date(seriesOne.dateStart).toLocaleDateString()}</td>
                <td>
                  <div className={classFinished}>{finished}</div>
                </td>
                <td>{seriesOne.type}</td>
                <td>{seriesOne.quantityStages}</td>
                {isStage ? (
                  ''
                ) : (
                  <>
                    <td>
                      <ButtonLink to={`/edit/series/${seriesOne._id}`} addCls="td">
                        редактировать
                      </ButtonLink>
                    </td>
                    <td>
                      <Button
                        addCls="danger td"
                        getClick={() => deleteStage(seriesOne._id)}
                        toolTip="Удаление Серии (Тура), соответствующих Этапов и всех 
												результатов заездов."
                      >
                        удалить
                      </Button>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      ) : (
        <ClearTbody quantityTd={isStage ? 7 : 9} />
      )}
    </table>
  );
}

export default TableSeries;
