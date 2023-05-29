import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchEvents } from '../../redux/features/api/eventsSlice';
import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import CardRacePreview from '../../components/CardRacePreview/CardRacePreview';
import MainInfo from '../../components/MainInfo/MainInfo';
import MainInfoDev from '../../components/MainInfo/MainInfoDev';

import styles from './MainPage.module.css';

const notFound = 'К сожалению, заезды не найдены ... ((';

function MainPage() {
  const { eventsPreview, status } = useSelector((state) => state.fetchEvents);
  const dispatch = useDispatch();
  useTitle('Ближайшие заезды');
  useBackground(false);

  const navigate = useNavigate();
  const toLink = (id) => navigate(`/race/schedule/${id}`);
  useEffect(() => {
    dispatch(fetchEvents({ started: false, target: 'preview' }));
  }, [dispatch]);
  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__preview}>
        {!eventsPreview[0]?.id && status === 'resolved' && (
          <div className={styles.title__notFound}>{notFound}</div>
        )}
        {eventsPreview.map((event) => (
          <CardRacePreview event={event} key={event.id} getClick={toLink} />
        ))}
      </div>
      <div className={styles.wrapper__info}>
        <h2 className={styles.title__info}>Информационный блок</h2>
        <MainInfo />
        <MainInfoDev />
      </div>
    </section>
  );
}

export default MainPage;
