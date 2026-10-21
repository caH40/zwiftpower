import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import CustomizedSnackbars from '../UI/Snackbars/CustomizedSnackbars';
import PopupInput from '../UI/PopupInput/PopupInput';
import PopupFormRelease from '../UI/PopupFormRelease/PopupFormRelease';
import PopupFormContainer from '../UI/PopupFormContainer/PopupFormContainer';
import { LoadingPage } from '../../Pages/LoadingPage/LoadingPage';
import { isStorageAvailable } from '../../utils/safeStorage';
// import BottomSlideUpAds from '../BottomSlideUpAds/BottomSlideUpAds';

import Body from './Body';
import Footer from './Footer/Footer';
import Header from './Header/Header';

import styles from './Body.module.css';

function MainLayer() {
  return (
    <div>
      {/* <BottomSlideUpAds /> */}
      <CustomizedSnackbars>
        {!isStorageAvailable() && (
          <div className={styles.notice}>
            В браузере отключены cookie — вход и сохранение настроек недоступны
          </div>
        )}
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
