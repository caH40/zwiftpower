import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useTitle from '../hook/useTitle';
import { setBackground } from '../redux/features/backgroundSlice';

function EditUsers() {
  useTitle('Редактирование аккаунтов пользователей');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBackground({ isActive: true, opacity: 0.7 }));
    return () => dispatch(setBackground({ isActive: false }));
  }, []);
  return <h2>Редактирование аккаунтов пользователей</h2>;
}

export default EditUsers;
