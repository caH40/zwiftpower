import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './RaceDescription.module.css';

function RaceDescription() {
  const { eventId } = useParams();
  return <div>RaceDescription</div>;
}

export default RaceDescription;
