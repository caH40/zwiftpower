import React from 'react';

import ClearTbody from '../ClearTbody/ClearTbody';

import styles from '../Table.module.css';

function TableStagesNew({ stages = [] }) {
  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <caption>Stages</caption>
      <thead>
        <tr>
          <th scope="col">Этап</th>
          <th scope="col">Начало</th>
          <th scope="col">Маршрут</th>
          <th scope="col">Мир</th>
          <th scope="col">Тип</th>
          <th scope="col">Круг</th>
          <th scope="col">Дистанция,км</th>
          <th scope="col">Набор,м</th>
          <th scope="col">Спринт</th>
          <th scope="col">Гора</th>
          <th scope="col">Zwift</th>
        </tr>
      </thead>
      {stages.length ? (
        <tbody>
          {stages.map((stage, index) => (
            <tr key={index}>
              <th scope="row">{stage.number}</th>
              <td>{stage.dateStart}</td>
              <td>
                <a href={stage.routeLink} target="_blank" rel="noreferrer">
                  {stage.route}
                </a>
              </td>
              <td>{stage.world}</td>
              <td>{stage.type}</td>
              <td>{stage.laps}</td>
              <td>{stage.distance}</td>
              <td>{stage.ascent}</td>
              <td>{stage.quantitySprints}</td>
              <td>{stage.quantityMountains}</td>
              <td>
                <a href={stage.link} target="_blank" rel="noreferrer">
									Звифт
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      ) : (
        <ClearTbody quantityTd={11} />
      )}
    </table>
  );
}

export default TableStagesNew;
