import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setBackground } from '../redux/features/backgroundSlice';

function useBackground(isActive, opacity) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBackground({ isActive, opacity }));
  }, [dispatch, isActive, opacity]);
}

export default useBackground;
