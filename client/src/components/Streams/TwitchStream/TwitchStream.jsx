import { domain } from '../../../config/environment';

import styles from './TwitchStream.module.css';

function TwitchStream({ channel }) {
  console.log({ channel });

  if (!channel) {
    return <></>;
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{channel}</h2>
      <iframe
        className={styles.iframe}
        src={`https://player.twitch.tv/?channel=${channel}&parent=${domain}`}
        allowFullScreen
      />
    </div>
  );
}

export default TwitchStream;
