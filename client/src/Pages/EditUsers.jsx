import React from 'react';

import useTitle from '../hook/useTitle';
import useBackground from '../hook/useBackground';

function EditUsers() {
  useTitle('Редактирование аккаунтов пользователей');
  useBackground(true, 0.7);
  return <h2>Редактирование аккаунтов пользователей</h2>;
}

export default EditUsers;
