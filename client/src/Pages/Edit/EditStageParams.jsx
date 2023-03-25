import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getStage, putStage } from '../../api/stage';
import Button from '../../components/UI/Button/Button';
import FormEditStage from '../../components/UI/FormEditStage/FormEditStage';
import useTitle from '../../hook/useTitle';
import { getAlert } from '../../redux/features/alertMessageSlice';

function EditStageParams() {
  const [stage, setStage] = useState({});
  const [update, setUpdate] = useState(false);
  const { stageId } = useParams();
  useTitle('Редактирование данных Series, Stage');

  const navigate = useNavigate();
  const getClick = () => navigate(-1);

  const dispatch = useDispatch();

  useEffect(() => {
    getStage(stageId).then((data) => setStage(data.data.stage));
  }, [stageId, update]);

  const sendForm = () => {
    putStage(stage).then((data) => {
      setUpdate((prev) => !prev);
      dispatch(getAlert({ message: data.data.message, type: data.type, isOpened: true }));
    });
  };

  return (
    <>
      {stage?._id ? (
        <>
          <section className="page__block">
            <h3 className="titlePage-3">
              Редактирование параметров этапа "{stage?.seriesId?.name}"
            </h3>
            <FormEditStage stage={stage} setStage={setStage} sendForm={sendForm} />
            <Button getClick={getClick}>назад</Button>
          </section>
        </>
      ) : (
        'Loading'
      )}
    </>
  );
}

export default EditStageParams;
