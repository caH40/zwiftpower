import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Line } from 'react-chartjs-2';

import { fetchUserPowerCurve } from '../../redux/features/api/userPowerCurveSlice';
import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import useChartPower from '../../hook/useChartPower';
import useScreenOrientation from '../../hook/useScreenOrientation';
import SimpleCheckbox from '../../components/UI/SimpleCheckbox/SimpleCheckbox';
import SelectForChart from '../../components/UI/SelectForChart/SelectForChart';

import styles from './ProfilePower.module.css';

function ProfileWeight() {
  const [formShowCharts, setFormShowCharts] = useState({ showChart90Days: true });
  const { powerFromEvents } = useSelector((state) => state.fetchUserPowerCurve);
  const [eventPowerCurrent, setEventPowerCurrent] = useState({});
  const { zwiftId } = useParams();
  const userAuth = useSelector((state) => state.checkAuth.value);

  const { isPortrait } = useScreenOrientation();

  const { data, options } = useChartPower(eventPowerCurrent, isPortrait, formShowCharts);
  useTitle('Профиль мощности');
  useBackground(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentZwiftId = zwiftId === 'me' ? userAuth.user.zwiftId : zwiftId;
    if (!currentZwiftId) return;
    dispatch(fetchUserPowerCurve({ zwiftId: currentZwiftId }));
  }, [dispatch, zwiftId, userAuth]);

  return (
    <section>
      <div className={styles.block}>
        <Line options={options} data={data} className={styles.chart} />
        <form className={styles.box__checkbox}>
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
        </form>
      </div>
    </section>
  );
}

export default ProfileWeight;
