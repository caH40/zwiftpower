import React from 'react';

import { Outlet } from 'react-router-dom';

import CustomizedSnackbars from '../UI/Snackbars/CustomizedSnackbars';
import PopupInput from '../UI/PopupInput/PopupInput';

import Body from './Body';
import Footer from './Footer/Footer';
import Header from './Header/Header';

function MainLayer() {
  return (
    <div className="wrapper">
      <CustomizedSnackbars>
        <Header />
        <Body>
          <Outlet />
        </Body>
        <Footer />
        <PopupInput />
      </CustomizedSnackbars>
    </div>
  );
}

export default MainLayer;
