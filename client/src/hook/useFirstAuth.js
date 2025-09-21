import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// import { checkAuth } from '../api/auth-check';
import { checkAuth, getAuth } from '../redux/features/authSlice';
// import { lsAccessToken } from '../constants/localstorage';

// Проверка авторизации при загрузке бандла.
const useFirstAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    // .unwrap()
    // .then((response) => {
    //   if (!response || response.success !== true) {
    //     return;
    //   }

    // console.log('useFirstAuth');

    // dispatch(getAuth({ status: true, user: response.user }));
    // })
    // .catch((error) => {
    //   console.log('useFirstAuth.error');
    //   dispatch(getAuth({ status: false, user: {} }));
    //   localStorage.setItem(lsAccessToken, '');
    // });
  }, []);
};
export default useFirstAuth;
