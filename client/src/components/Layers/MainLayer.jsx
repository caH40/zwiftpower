import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import CustomizedSnackbars from '../UI/Snackbars/CustomizedSnackbars';
import PopupInput from '../UI/PopupInput/PopupInput';
import PopupFormRelease from '../UI/PopupFormRelease/PopupFormRelease';

import Body from './Body';
import Footer from './Footer/Footer';
import Header from './Header/Header';

function MainLayer() {
  return (
    <div className="wrapper">
      <CustomizedSnackbars>
        <Header />
        <Body>
          <Suspense>
            <Outlet />
          </Suspense>
        </Body>
        <Footer />
        <PopupInput />
        <PopupFormRelease />
      </CustomizedSnackbars>
    </div>
  );
}

export default MainLayer;
