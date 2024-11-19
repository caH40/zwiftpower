import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import Button from '../../components/UI/Button/Button';
import { fetchPowerCurve } from '../../redux/features/api/fetchPowerCurve';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { fetchUserProfile } from '../../redux/features/api/userProfileSlice';

import styles from './RiderModerationMain.module.css';

/**
 * Главная страница модерации данных Райдера.
 */
export default function RiderModerationMain() {
  useTitle('Главная страница модерации райдера');
  const { zwiftId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleButtonUpdatePowerCurve = () => {
    dispatch(fetchPowerCurve({ zwiftId })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(fetchUserProfile({ zwiftId }));
        dispatch(getAlert({ message: res.payload.message, type: 'success', isOpened: true }));
      }
    });
  };

  return (
    <section className={styles.wrapper}>
      <Button getClick={() => handleButtonUpdatePowerCurve()}>Обновить кривую мощности</Button>
    </section>
  );
}
