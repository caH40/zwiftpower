import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitlePage } from '../redux/features/titleSlice';

const useTitle = title => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTitlePage({ title }));
	}, [title, dispatch]);
};

export default useTitle;
