import React from 'react';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';

function Faq() {
  useTitle('Часто задаваемые вопросы');
  useBackground(true);
  return <h2>В разработке...</h2>;
}

export default Faq;
