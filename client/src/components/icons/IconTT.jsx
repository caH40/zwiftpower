import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconTT({ squareSize = 24 }) {
  return (
    <MyTooltip tooltip={'Драфт отключен'}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.3043 10.4347C18.7562 10.4347 18.232 10.5339 17.7426 10.7074L16.1739 7.88375V5.73903H18.5217C18.9533 5.73903 19.3043 6.09012 19.3043 6.52166C19.3043 6.9537 19.6549 7.30428 20.087 7.30428C20.519 7.30428 20.8696 6.9537 20.8696 6.52166C20.8696 5.22702 19.8164 4.17383 18.5218 4.17383H15.3913C14.9593 4.17383 14.6087 4.52441 14.6087 4.95645V7.30428H8.53477L7.66247 5.73908H7.82611C8.25816 5.73908 8.60873 5.3885 8.60873 4.95645C8.60873 4.52441 8.25816 4.17383 7.82611 4.17383H4.69566C4.26361 4.17383 3.91303 4.52441 3.91303 4.95645C3.91303 5.3885 4.26361 5.73908 4.69566 5.73908H5.8702L7.2 8.1252L5.9977 10.6222C5.58366 10.5024 5.14772 10.4347 4.69566 10.4347C2.10633 10.4347 0 12.541 0 15.1303C0 17.7197 2.10633 19.826 4.69566 19.826C7.0178 19.826 8.94628 18.1302 9.32062 15.913H9.52453C9.85931 16.9676 10.8361 17.739 12 17.739C13.4384 17.739 14.6087 16.5687 14.6087 15.1303C14.6087 14.3821 14.2877 13.7112 13.7813 13.235L15.441 9.78786L16.3739 11.4672C15.2995 12.3285 14.6087 13.6493 14.6087 15.1303C14.6087 17.7197 16.715 19.826 19.3043 19.826C21.8937 19.826 24 17.7197 24 15.1303C24 12.541 21.8937 10.4347 19.3043 10.4347ZM4.69566 18.2607C2.96944 18.2607 1.5652 16.8566 1.5652 15.1303C1.5652 13.4041 2.96939 11.9998 4.69566 11.9998C4.90425 11.9998 5.10788 12.0214 5.30522 12.0604L3.99056 14.7909C3.73969 15.3123 4.12205 15.9129 4.6957 15.9129H7.72312C7.37419 17.261 6.15127 18.2607 4.69566 18.2607ZM5.94094 14.3477L6.71433 12.7415C7.20127 13.1537 7.55855 13.712 7.72312 14.3477H5.94094ZM9.52448 14.3477H9.32058C9.10908 13.095 8.40263 12.0107 7.40677 11.3031L8.13183 9.79728L10.1086 13.3443C9.84202 13.6265 9.64467 13.9691 9.52448 14.3477ZM12.3697 12.5591C12.2478 12.5415 12.1266 12.5217 12 12.5217C11.8193 12.5217 11.6429 12.5403 11.4725 12.5755L9.40711 8.86948H14.1461L12.3697 12.5591ZM19.3043 18.2607C17.5781 18.2607 16.1739 16.8566 16.1739 15.1303C16.1739 14.2389 16.5502 13.4352 17.1502 12.8646L18.6201 15.5104C18.7632 15.7677 19.0302 15.9129 19.3049 15.9129C19.4338 15.9129 19.5642 15.8813 19.6844 15.8145C20.0625 15.6046 20.1985 15.1282 19.9886 14.7502L18.5183 12.1037C18.77 12.0383 19.0324 11.9998 19.3043 11.9998C21.0305 11.9998 22.4348 13.404 22.4348 15.1303C22.4348 16.8566 21.0306 18.2607 19.3043 18.2607Z"
            fill="#008600"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconTT;
