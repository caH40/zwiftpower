import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from '../Table.module.css';

import { useResize } from '../../../hook/use-resize';

import Thead from './Thead';

function TableSeries({ series }) {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.checkAuth.value.user);
  const { isScreenLg: lg, isScreenSm: sm } = useResize();

  const getLink = (seriesId) => navigate(`${seriesId}`);

  const isModerator = ['admin', 'moderator'].includes(role);
  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <Thead lg={lg} sm={sm} isModerator={isModerator} />
      <tbody>
        {series.map((seriesOne) => (
          <tr
            className={styles.trLink}
            key={seriesOne._id}
            onClick={() => getLink(seriesOne.type?.toLowerCase())}
          >
            <td>{seriesOne.organizer}</td>
            <td>{seriesOne.name}</td>
            <td>{seriesOne.descriptionShort}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableSeries;
