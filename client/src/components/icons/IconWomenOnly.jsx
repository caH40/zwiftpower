import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconWomenOnly({ squareSize = 24 }) {
  return (
    <MyTooltip tooltip={'Только для женщин'}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle id="Vector" cx="15" cy="15" r="15" fill="#3D3D3D" />
          <path
            id="Vector_2"
            d="M 7.5325 17.8651 L 9.4981 15.8993 L 10.9335 17.3348 L 11.6509 16.6174 L 12.0409 16.2254 L 12.3682 15.9001 L 14.3339 17.8657 L 14.005 18.1906 L 13.6165 18.5831 L 12.8992 19.3004 L 14.333 20.7342 L 12.3673 22.6998 L 10.9335 21.2661 L 9.4991 22.7005 L 7.5335 20.735 L 8.9679 19.3004 L 7.5325 17.8651 Z M 16.8902 18.9853 C 13.7786 18.9853 11.2478 16.4545 11.2478 13.343 C 11.2478 10.2313 13.7786 7.7006 16.8902 7.7006 C 20.0017 7.7006 22.5325 10.2314 22.5325 13.343 C 22.5325 16.4544 20.0017 18.9853 16.8902 18.9853 Z M 16.8902 10.4806 C 15.3122 10.4806 14.0278 11.765 14.0278 13.3431 C 14.0278 14.921 15.3123 16.2056 16.8902 16.2056 C 18.4682 16.2056 19.7528 14.921 19.7528 13.3432 C 19.7526 11.765 18.4683 10.4806 16.8902 10.4806 Z"
            fill="white"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconWomenOnly;
