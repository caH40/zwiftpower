import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import store from './redux/store/store';

import App from './App';
import './css/index.css';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <HelmetProvider>
        <ScrollToTop />
        <App />
      </HelmetProvider>
    </Provider>
  </BrowserRouter>
);
