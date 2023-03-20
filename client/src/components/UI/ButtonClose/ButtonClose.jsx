import React from 'react';

import cls from './ButtonClose.module.css';

const ButtonClose = ({ getClick }) => {
	return <button onClick={getClick} className={cls.myBtn} type="button" />;
};

export default ButtonClose;
