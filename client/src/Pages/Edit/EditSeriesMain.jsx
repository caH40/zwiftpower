import React from 'react';
import { useNavigate } from 'react-router-dom';

import TableSeries from '../../components/Tables/Series/TableSeries';
import Button from '../../components/UI/Button/Button';
import ButtonLink from '../../components/UI/ButtonLink/ButtonLink';
import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';

import styles from './Edit.module.css';

function EditSeriesMain() {
  useTitle('Редактирование данных Series, Stage');
  useBackground(false);

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <>
      <h3 className="titlePage-3">Выберите Series для редактирования</h3>
      <TableSeries target={'series'} />
      <div className={styles.right}>
        <ButtonLink to="add" toolTip="Добавление новой Серии (Тура).">
          Добавить
        </ButtonLink>
      </div>
      <Button getClick={goBack}>назад</Button>
    </>
  );
}

export default EditSeriesMain;
