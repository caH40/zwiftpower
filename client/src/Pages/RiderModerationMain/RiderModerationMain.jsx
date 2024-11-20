import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useTitle from '../../hook/useTitle';
import Button from '../../components/UI/Button/Button';

import { fetchPowerCurve } from '../../redux/features/api/fetchPowerCurve';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { fetchUserProfile } from '../../redux/features/api/userProfileSlice';
import { fetchGetRiderBan } from '../../redux/features/api/rider-ban/fetchRiderBan';

import styles from './RiderModerationMain.module.css';

/**
 * Главная страница модерации данных Райдера.
 */
export default function RiderModerationMain() {
  useTitle('Главная страница модерации райдера');
  const { zwiftId } = useParams();

  const dispatch = useDispatch();

  // Получение списка баннов для райдера.
  useEffect(() => {
    dispatch(fetchGetRiderBan({ zwiftId }));
  }, []);

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
