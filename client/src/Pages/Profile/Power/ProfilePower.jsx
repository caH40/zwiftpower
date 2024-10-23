import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

import { fetchUserPowerCurve } from '../../../redux/features/api/userPowerCurveSlice';
import useTitle from '../../../hook/useTitle';
import useChartPower from '../../../hook/chart/useChartPower';
import useScreenOrientation from '../../../hook/useScreenOrientation';
import SimpleCheckbox from '../../../components/UI/SimpleCheckbox/SimpleCheckbox';
import SelectForChart from '../../../components/UI/SelectForChart/SelectForChart';
import FilterWatts from '../../../components/UI/Filters/FilterWatts/FilterWatts';
import { fetchUserProfile } from '../../../redux/features/api/userProfileSlice';
import { HelmetProfile } from '../../../components/Helmets/HelmetProfile';

import styles from './ProfilePower.module.css';

function ProfileWeight() {
  const [formShowCharts, setFormShowCharts] = useState({ showChart90Days: true });

  const { powerFromEvents, status: statusFetchStatus } = useSelector(
    (state) => state.fetchUserPowerCurve
  );
  const { profile } = useSelector((state) => state.fetchUserProfile);
  const [eventPowerCurrent, setEventPowerCurrent] = useState({});
  const { zwiftId } = useParams();
  const { user } = useSelector((state) => state.checkAuth.value);
  useTitle('Профиль мощности');
  const { isPortrait } = useScreenOrientation();

  // данные для диаграммы
  const { data, options } = useChartPower(eventPowerCurrent, isPortrait, formShowCharts);

  const dispatch = useDispatch();

  useEffect(() => {
    const currentZwiftId = zwiftId === 'me' ? user.zwiftId : zwiftId;
    if (!currentZwiftId) {
      return;
    }
    dispatch(fetchUserPowerCurve({ zwiftId: currentZwiftId }));
    dispatch(fetchUserProfile({ zwiftId: currentZwiftId }));
  }, [dispatch, zwiftId, user]);

  return (
    <section>
      <HelmetProfile
        profileId={zwiftId}
        firstName={profile.firstName}
        lastName={profile.lastName}
        image={profile.imageSrc}
        page={'power'}
      />

      <div className={styles.box__filter}>
        <FilterWatts />
      </div>

      {statusFetchStatus === 'loading' && <div className={styles.skeleton} />}

      {statusFetchStatus === 'resolved' && (
        <div>
          <Line options={options} data={data} className={styles.chart} />

          <div className={styles.box__checkbox}>
            <SelectForChart
              state={eventPowerCurrent}
              setState={setEventPowerCurrent}
              property={'event'}
              optionsRaw={powerFromEvents}
            />
            <SimpleCheckbox
              state={formShowCharts}
              setState={setFormShowCharts}
              property={'showChart90Days'}
              title={'90 дней'}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default ProfileWeight;
