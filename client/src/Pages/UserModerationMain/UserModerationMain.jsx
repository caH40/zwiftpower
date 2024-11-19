import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import Button from '../../components/UI/Button/Button';
import { fetchPowerCurve } from '../../redux/features/api/fetchPowerCurve';
import { getAlert } from '../../redux/features/alertMessageSlice';

import styles from './UserModerationMain.module.css';

export default function UserModerationMain() {
  useTitle('Главная страница модерации пользователя');
  const { _id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleButtonUpdatePowerCurve = () => {
    dispatch(fetchPowerCurve({ _idUser: _id })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
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
