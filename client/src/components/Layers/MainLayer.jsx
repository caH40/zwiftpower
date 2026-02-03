import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import CustomizedSnackbars from '../UI/Snackbars/CustomizedSnackbars';
import PopupInput from '../UI/PopupInput/PopupInput';
import PopupFormRelease from '../UI/PopupFormRelease/PopupFormRelease';
import PopupFormContainer from '../UI/PopupFormContainer/PopupFormContainer';
import { LoadingPage } from '../../Pages/LoadingPage/LoadingPage';

import Body from './Body';
import Footer from './Footer/Footer';
import Header from './Header/Header';

function MainLayer() {
  return (
    <div>
      <CustomizedSnackbars>
        <Header />
        <Body>
          <Suspense fallback={<LoadingPage />}>
            <Outlet />
          </Suspense>
        </Body>
        <Footer />
        <PopupInput />
        <PopupFormRelease />
        <PopupFormContainer />
      </CustomizedSnackbars>
    </div>
  );
}

export default MainLayer;
