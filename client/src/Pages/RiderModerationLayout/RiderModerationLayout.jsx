import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Outlet, useMatch, useParams } from 'react-router-dom';

import IconRaceType from '../../components/icons/IconRaceType';
import useTitle from '../../hook/useTitle';
import NavAdmin from '../../components/UI/NavAdmin/NavAdmin';
import SkeletonProfileBlock from '../../components/SkeletonLoading/SkeletonProfileBlock/SkeletonProfileBlock';
import ProfileBlock from '../../components/ProfileBlock/ProfileBlock';
import { fetchUserProfile, resetUserProfile } from '../../redux/features/api/userProfileSlice';
import SkeletonProfileCPBlock from '../../components/SkeletonLoading/SkeletonProfileBlock/SkeletonProfileCPBlock';
import CPBlock from '../../components/CPBlock/CPBlock';

import styles from './RiderModerationLayout.module.css';

/**
 * Layout для страниц модерации rider с zwiftId.
 */
export default function RiderModerationLayout() {
  useTitle('Модерация райдера');
  const { zwiftId } = useParams();
  const {
    profile,
    quantityRace,
    status: statusProfile,
    powerCurve,
  } = useSelector((state) => state.fetchUserProfile);

  const dispatch = useDispatch();

  const matchRoot = useMatch(`/admin/riders/${zwiftId}`); // Проверяем соответствие корневому маршруту

  // Получение данных профиля райдера с сервера.
  useEffect(() => {
    dispatch(fetchUserProfile({ zwiftId }));

    return () => dispatch(resetUserProfile());
  }, [dispatch, zwiftId]);

  const items = [
    { to: `/admin/riders/${zwiftId}/main`, title: 'Главная', icon: IconRaceType },
    { to: `/admin/riders/${zwiftId}/activities`, title: 'Активности', icon: IconRaceType },
    { to: `/admin/riders/${zwiftId}/bans`, title: 'Блокировки', icon: IconRaceType },
  ];

  return (
    <section className={styles.wrapper}>
      <NavAdmin items={items} />

      {/* Блок профиля: изображение и основные данные райдера */}
      <SkeletonProfileBlock status={statusProfile} />
      {statusProfile === 'resolved' && (
        <ProfileBlock profile={profile} quantityRace={quantityRace || 0} />
      )}

      <SkeletonProfileCPBlock status={statusProfile} />
      {statusProfile === 'resolved' && (
        <div className={styles.block__cp}>
          <CPBlock criticalPowers={powerCurve?.pointsWattsPerKg} label={'wattsPerKg'} />
          <CPBlock criticalPowers={powerCurve?.pointsWatts} label={'watts'} />
        </div>
      )}

      {/* Контент, который отображается только на маршруте users/:_id */}
      {matchRoot && (
        <div className={styles.info}>
          <p>
            Здесь вы можете управлять данными сущности Rider из Zwift: фитфайлами и активностями
            на основе которых рассчитывается Кривая мощности
          </p>
        </div>
      )}

      {/* Дочерние маршруты */}
      <Outlet />
    </section>
  );
}
