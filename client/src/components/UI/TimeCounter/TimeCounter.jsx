import { useState, useEffect } from 'react';

const TimeCounter = ({ startDate }) => {
  const [timeElapsed, setTimeElapsed] = useState('расчет времени...');

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const now = new Date();
      const start = new Date(startDate);
      const diff = now - start;

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      const dayStr = days !== 0 ? `${days} дней ` : '';
      const hoursStr = hours !== 0 ? `${hours}:` : '';
      const minutesStr = String(minutes).padStart(2, 0);
      const secondsStr = String(seconds).padStart(2, 0);

      setTimeElapsed(`${dayStr}${hoursStr}${minutesStr}:${secondsStr}`);
    };

    // Обновление каждую секунду/
    const intervalId = setInterval(calculateTimeElapsed, 1000);

    // Очистка интервала при размонтировании компонента/
    return () => clearInterval(intervalId);
  }, [startDate]);

  return <div>{timeElapsed}</div>;
};

export default TimeCounter;
