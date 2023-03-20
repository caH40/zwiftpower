import React from 'react';

import ButtonClose from '../ButtonClose/ButtonClose';

import cls from './Modal.module.css';

const Modal = ({ isVisibleModal, setIsVisibleModal, box }) => {
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
						<h3 className={cls.title}>Добавление результата</h3>
						<p className={cls.text}>
							Выберите райдера результат которого необходимо добавить в протокол. Добавлять результат
							можно только для зарегистрированных райдеров.
						</p>
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
