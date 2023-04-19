import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { checkRiderResult, postResult } from '../../api/result';
import { getRider, getRiders } from '../../api/riders';
import { getStage } from '../../api/stage';
import FormRiderResult from '../../components/UI/FormRiderResult/FormRiderResult';
import FormRiderSearch from '../../components/UI/FormRiderSearch/FormRiderSearch';
import useTitle from '../../hook/useTitle';
import { getAlert } from '../../redux/features/alertMessageSlice';
import useBackground from '../../hook/useBackground';

import styles from './AddRider.module.css';
import { checkForm, getScroll, resultClear, resultStart } from './service';

function AddRider() {
  const [query, setQuery] = useState({ fio: '' });
  const [rider, setRider] = useState({});
  const [stage, setStage] = useState({});
  const [riders, setRiders] = useState([]);
  const [filteredRiders, setFilteredRiders] = useState([]);
  const [newResult, setNewResult] = useState(resultClear);
  const refTitle = useRef(null);

  useTitle('Добавление результата в протокол этапа');
  useBackground(false);
  const { stageId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getRiders().then((response) => setRiders(response.data.riders));
    getStage(stageId).then((response) => setStage(response.data.stage));
  }, [stageId]);

  useEffect(() => {
    setFilteredRiders(
      [...riders]
        .filter((rider) =>
          (rider.firstName.toLowerCase() + ' ' + rider.lastName.toLowerCase()).includes(
            query.fio.toLowerCase()
          )
        )
        .sort((a, b) => a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase()))
        .slice(0, 20)
    );
  }, [query, riders]);

  useEffect(() => {
    setNewResult(resultStart(stageId, rider));
  }, [stageId, rider]);

  const getRiderData = async (zwiftId) => {
    const hasResult = await checkRiderResult(zwiftId, stageId)
      .then((response) => false)
      .catch((error) => {
        dispatch(
          getAlert({ message: error.response?.data?.message, type: 'error', isOpened: true })
        );
        return true;
      });
    if (hasResult) return;
    getRider(zwiftId).then((response) => {
      setRider(response.data.rider);
      getScroll(refTitle.current);
    });
  };

  const saveResult = () => {
    const checkedForm = checkForm(newResult);
    if (!checkedForm.isCorrect)
      return dispatch(
        getAlert({ message: checkedForm.message, type: 'warning', isOpened: true })
      );

    postResult({
      ...newResult,
      weightInGrams: Math.round((newResult.watt / newResult.wattPerKg) * 1000),
    })
      .then((response) => {
        dispatch(
          getAlert({ message: response.data?.message, type: 'success', isOpened: true })
        );
        navigate(-1);
      })
      .catch((error) =>
        dispatch(
          getAlert({ message: error.response?.data?.message, type: 'error', isOpened: true })
        )
      );
    return false;
  };

  const goBack = () => navigate(-1);

  return (
    <section>
      <h2
        className={styles.title}
      >{`Выберите райдера, чтобы добавить результат в Этап №${stage.number} "${stage.seriesId?.name}"`}</h2>
      <FormRiderSearch
        query={query}
        setQuery={setQuery}
        riders={riders}
        filteredRiders={filteredRiders}
        getRiderData={getRiderData}
        goBack={goBack}
      />
      <h2 ref={refTitle} className={styles.title}>{`Заполните данные по заезду райдера ${
        rider.firstNameZwift ? `${rider.firstNameZwift} ${rider.lastNameZwift}` : ''
      }`}</h2>
      <FormRiderResult
        newResult={newResult}
        setNewResult={setNewResult}
        goBack={goBack}
        saveResult={saveResult}
      />
    </section>
  );
}

export default AddRider;
