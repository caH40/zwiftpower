import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { downloadXLSX } from '../../service/riders';
import { getRiders } from '../../api/riders';
import TableRiders from '../../components/Tables/TableRiders/TableRiders';
import Button from '../../components/UI/Button/Button';
import useTitle from '../../hook/useTitle';

import styles from './Riders.module.css';

function Riders() {
  const [riders, setRiders] = useState([]);

  useTitle('Зарегистрированные Райдеры');
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const getAllRidersXLSM = (riders) => downloadXLSX(riders);

  useEffect(() => {
    getRiders().then((response) => setRiders(response.data.riders));
  }, []);

  return (
    <>
      <h3 className={styles.title}>Данные зарегистрированных Райдеров</h3>
      <div className={styles.right}>
        <Button getClick={() => getAllRidersXLSM(riders)}>Скачать</Button>
      </div>
      <TableRiders riders={riders} />

      <Button getClick={goBack}>назад</Button>
    </>
  );
}

export default Riders;
