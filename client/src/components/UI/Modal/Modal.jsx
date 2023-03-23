import React from 'react';

import ButtonClose from '../ButtonClose/ButtonClose';

import styles from './Modal.module.css';

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
				<div className={styles.wrapper}>
					<div className={styles.block}>
						<h3 className={styles.title}>{title}</h3>
						<p className={styles.text}>{children}</p>
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
