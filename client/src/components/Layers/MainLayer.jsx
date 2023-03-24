import React from 'react';

import { Outlet } from 'react-router-dom';

import CustomizedSnackbars from '../UI/Snackbars/CustomizedSnackbars';

import Body from './Body';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const MainLayer = () => {
	return (
		<div className="wrapper">
			<CustomizedSnackbars>
				<Header />
				<Body>
					<Outlet />
				</Body>
				<Footer />
			</CustomizedSnackbars>
		</div>
	);
};

export default MainLayer;
