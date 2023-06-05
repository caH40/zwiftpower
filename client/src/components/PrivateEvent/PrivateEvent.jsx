import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './PrivateEvent.module.css';

function PrivateEvent({ event }) {
  return (
    <>
      {event.microserviceEventVisibility === 'DEFINED_BY_RESOURCE_ID' && (
        <MyTooltip tooltip={`Только для участников клуба "${event.clubName}"`}>
          <span className={styles.text}>(private event)</span>
        </MyTooltip>
      )}
    </>
  );
}

export default PrivateEvent;
