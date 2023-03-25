import React from 'react';
import { useNavigate } from 'react-router-dom';

import TableSeries from '../components/Tables/Series/TableSeries';
import Button from '../components/UI/Button/Button';
import useTitle from '../hook/useTitle';

function EditSeriesList() {
  useTitle('Редактирование данных этапа');

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <>
      <h3 className="titlePage-3">Редактирование данных заездов. Выберите Серию</h3>
      <TableSeries target="stage" />
      <Button getClick={goBack}>назад</Button>
    </>
  );
}

export default EditSeriesList;
