import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { postResults, postSchedule } from '../../api/schedule';
import UploadResults from '../../components/UploadResults/UploadResults';
import UploadSeriesAndStage from '../../components/UploadSeriesAndStage/UploadSeriesAndStage';
import useTitle from '../../hook/useTitle';
import { getAlert } from '../../redux/features/alertMessageSlice';

import styles from './Upload.module.css';

const Upload = () => {
  const [schedule, setSchedule] = useState({});
  const [results, setResults] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useTitle('Загрузка расписаний, протоколов этапов');

  const saveSchedule = () => {
    postSchedule(schedule)
      .then((data) => {
        dispatch(getAlert({ message: data.data?.message, type: 'success', isOpened: true }));
        navigate('/edit/series/');
      })
      .catch((error) =>
        dispatch(
          getAlert({ message: 'Ошибка при сохранении данных!', type: 'error', isOpened: true })
        )
      );
  };

  const saveResults = () => {
    postResults(results)
      .then((response) => {
        dispatch(
          getAlert({ message: response.data?.message, type: 'success', isOpened: true })
        );
        navigate(`/edit/stage/${response.data.ids.seriesId}/${response.data.ids.stageId}`);
      })
      .catch((error) => {
        let message = 'Ошибка при сохранении данных!';
        if (error.response?.data?.message) {
          ({ message } = error.response.data);
        }
        dispatch(getAlert({ message, type: 'error', isOpened: true }));
      });
  };

  return (
    <section className={styles.wrapper}>
      <div className={cn(styles.block, { [styles.clear]: !schedule?.fileAttributes })}>
        <h2 className={styles.title}>Загрузка расписания серии и этапов</h2>
        <UploadSeriesAndStage
          schedule={schedule}
          setSchedule={setSchedule}
          saveSchedule={saveSchedule}
        />
      </div>

      <div className={cn(styles.block, { [styles.clear]: !results.fileAttributes })}>
        <h2 className={styles.title}>Загрузка протокола с результатами этапа</h2>
        <UploadResults results={results} setResults={setResults} saveResults={saveResults} />
      </div>
    </section>
  );
};

export default Upload;
