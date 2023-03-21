import React from 'react';

import ButtonClose from '../ButtonClose/ButtonClose';

import cls from './Modal.module.css';

const Modal = ({ children, title, box, isVisibleModal, setIsVisibleModal }) => {
	const getClick = () => setIsVisibleModal(false);
	window.addEventListener('keydown', keyHandler);
	function keyHandler(e) {
		if (e.keyCode !== 27) return;
		window.removeEventListener('keydown', keyHandler);
		setIsVisibleModal(false);
	}

	return (
		<>
			{isVisibleModal ? (
				<div className={cls.wrapper}>
					<div className={cls.block}>
						<h3 className={cls.title}>{title}</h3>
						<p className={cls.text}>{children}</p>
						{box}
						<ButtonClose getClick={getClick} />
					</div>
				</div>
			) : (
				''
			)}
		</>
	);
};

export default Modal;
