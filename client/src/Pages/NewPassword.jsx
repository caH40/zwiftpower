import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';

// import { checkRequestPassword } from '../api/check-request-password';
// import { getModal } from '../redux/features/modalSlice';

const NewPassword = () => {
	// const [message, setMessage] = useState('');
	// const { token } = useParams();

	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	checkRequestPassword(token).then(response => {
	// 		const userId = response?.data?.userId;
	// 		setMessage(response.data.message);
	// 		if (userId) dispatch(getModal({ component: 'AddNewPassword', userId }));
	// 	});
	// }, [token, dispatch]);
	return (
		<section className="page404">
			{/* <h1 className="page404__title">Страница создания нового пароля</h1>
			<p className="page404__text">{message}</p> */}
		</section>
	);
};

export default NewPassword;
