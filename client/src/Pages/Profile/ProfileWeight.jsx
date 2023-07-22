import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, // x scale
  LinearScale, // y scale
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler,
} from 'chart.js';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';

import styles from './ProfileWeight.module.css';

ChartJS.register(
  CategoryScale, // x scale
  LinearScale, // y scale
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler
);

function ProfileWeight() {
  useTitle('Профиль мощности');
  useBackground(false);

  const data = {
    labels: ['Mon', 'Tue', 'Wed'],
    datasets: [
      {
        label: 'Sales of week',
        data: [4, 2, 5],
        backgroundColor: 'rgba(255, 145, 0, 0.9)',
        borderColor: 'rgba(255, 145, 0, 1)',
        pointBorderColor: 'green',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Sales of week',
        data: [3, 5, 4],
        backgroundColor: 'rgb(33, 150, 140)',
        borderColor: 'black',
        pointBorderColor: 'aqua',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    plugins: {
      legends: true,
      tooltip: {
        backgroundColor: 'rgba(150, 33, 33, 0.8)',
        titleColor: 'white',
      },
    },
    scales: {
      y: {
        min: 2,
        max: 6,
      },
    },
  };

  return (
    <section>
      <div className={styles.block}>
        <Line options={options} data={data} />
      </div>
    </section>
  );
}

export default ProfileWeight;
