import React from 'react';

import ClearTbody from '../ClearTbody/ClearTbody';

import styles from '../Table.module.css';
import { tdLinkZP } from '../utils/td';

const TableRiders = ({ riders = [] }) => {
  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <caption>Райдеры</caption>
      <thead>
        <tr>
          <th>#</th>
          <th>ZwiftId</th>
          <th>FIO</th>
          <th>ZwiftName</th>
          <th>Trainer</th>
          <th>ProfileZP</th>
          <th>gender</th>
        </tr>
      </thead>
      {riders.length ? (
        <tbody>
          {riders.map((rider, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{rider.zwiftId}</td>
              <td>{`${rider.firstName} ${rider.lastName}`}</td>
              <td>{`${rider.firstNameZwift} ${rider.lastNameZwift}`}</td>
              <td>{rider.cycleTrainer}</td>
              <td>{tdLinkZP(rider.zwiftPower)}</td>
              <td>{rider.gender}</td>
            </tr>
          ))}
        </tbody>
      ) : (
        <ClearTbody quantityTd={7} />
      )}
    </table>
  );
};

export default TableRiders;
