import { useState } from 'react';

import { domain } from '../../../config/environment';

import styles from './TwitchStream.module.css';

/**
 * Компонент для отображения Twitch-трансляции с индикатором загрузки.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} props.channel - Название Twitch-канала для трансляции.
 * @returns {JSX.Element} Элемент, содержащий плеер Twitch или индикатор загрузки.
 */
function TwitchStream({ channel }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.wrapper}>
      {/* {isLoading && <div className={styles.loader}>Загрузка...</div>} */}

      <iframe
        className={styles.iframe}
        src={`https://player.twitch.tv/?channel=${channel}&parent=${domain}`}
        allowFullScreen
        onLoad={() => setIsLoading(false)} // Убираем индикатор после загрузки
      />
    </div>
  );
}

export default TwitchStream;
