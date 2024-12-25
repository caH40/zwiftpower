import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { checkAuth } from '../api/auth-check';
import { getAuth } from '../redux/features/authSlice';
import { lsAccessToken } from '../constants/localstorage';

// Проверка авторизации при загрузке бандла.
const useFirstAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkAuth()
      .then((response) => {
        if (!response || response.data.success !== true) {
          return;
        }

        dispatch(getAuth({ status: true, user: response.data.user }));
        localStorage.setItem(lsAccessToken, response.data.accessToken);
      })
      .catch((error) => {
        dispatch(getAuth({ status: false, user: {} }));
        localStorage.setItem(lsAccessToken, '');
      });
  }, [dispatch]);
};
export default useFirstAuth;
