import React from 'react';

import useTitle from '../hook/useTitle';
import useBackground from '../hook/useBackground';

function Home() {
  useTitle('Домашняя страница');
  useBackground(true);
  return <div></div>;
}

export default Home;
