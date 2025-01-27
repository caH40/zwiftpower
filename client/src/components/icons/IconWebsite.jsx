import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconWebsite({ squareSize = 24, tooltip, color = '#0F4FA8' }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="2" width="20" height="20" fill={color} />
          <path
            d="M17.6568 6.34315C16.1459 4.83214 14.1369 4 12 4C9.86312 4 7.85413 4.83214 6.34315 6.34315C4.83217 7.85417 4 9.86312 4 12C4 14.1369 4.83214 16.1459 6.34315 17.6568C7.85417 19.1678 9.86312 20 12 20C14.1369 20 16.1459 19.1679 17.6568 17.6568C19.1678 16.1458 20 14.1369 20 12C20 9.86312 19.1679 7.85413 17.6568 6.34315ZM18.8321 15.0583H17.6403C17.9169 14.179 18.0724 13.2339 18.0959 12.2592H19.4767C19.4436 13.2387 19.2232 14.1856 18.8321 15.0583ZM4.52327 12.2592H5.90414C5.9276 13.2339 6.08304 14.179 6.35971 15.0583H5.1679C4.77685 14.1856 4.55641 13.2387 4.52327 12.2592ZM5.1679 8.94168H6.35971C6.08308 9.82096 5.92764 10.7661 5.90414 11.7408H4.52327C4.55641 10.7613 4.77685 9.81439 5.1679 8.94168ZM15.3329 11.7408C15.3204 10.7656 15.2373 9.82023 15.0897 8.94168H17.093C17.3815 9.8014 17.5519 10.7468 17.5773 11.7408H15.3329ZM13.7406 17.8229H12.2592V15.5767H14.4647C14.326 16.2322 14.1481 16.8389 13.9339 17.3779C13.8718 17.5342 13.8072 17.6825 13.7406 17.8229ZM12.2592 19.4467V18.3413H13.4635C13.094 18.9509 12.6794 19.334 12.2592 19.4467ZM10.5365 18.3413H11.7408V19.4467C11.3206 19.334 10.906 18.9509 10.5365 18.3413ZM10.0661 17.3779C9.85192 16.8389 9.67399 16.2322 9.53534 15.5767H11.7408V17.8229H10.2594C10.1928 17.6825 10.1282 17.5342 10.0661 17.3779ZM10.2594 6.17711H11.7408V8.42333H9.53534C9.67402 7.76781 9.85192 7.16112 10.0661 6.6221C10.1282 6.46576 10.1928 6.31755 10.2594 6.17711ZM11.7408 4.55333V5.65875H10.5365C10.906 5.04905 11.3206 4.66602 11.7408 4.55333ZM13.4635 5.65875H12.2592V4.55333C12.6794 4.66602 13.094 5.04905 13.4635 5.65875ZM13.9339 6.6221C14.1481 7.16112 14.326 7.76778 14.4647 8.42333H12.2592V6.17711H13.7406C13.8072 6.31755 13.8718 6.46576 13.9339 6.6221ZM11.7408 8.94168V11.7408H9.18549C9.19834 10.7615 9.28387 9.81526 9.43572 8.94168H11.7408ZM11.7408 12.2592V15.0583H9.43575C9.28391 14.1847 9.19838 13.2385 9.18552 12.2592H11.7408ZM12.2592 15.0583V12.2592H14.8145C14.8017 13.2385 14.7161 14.1847 14.5643 15.0583H12.2592ZM12.2592 11.7408V8.94168H14.5643C14.7161 9.81526 14.8016 10.7615 14.8145 11.7408H12.2592ZM14.9935 8.42333C14.8456 7.69735 14.6519 7.02531 14.4156 6.43072C14.3811 6.34388 14.3458 6.25959 14.3099 6.17711H15.5C16.0696 6.79357 16.5474 7.55653 16.9008 8.42333H14.9935ZM14.0598 5.65875C13.8757 5.31504 13.6775 5.02151 13.4679 4.78148C14.0004 4.97631 14.5015 5.27437 14.9583 5.65875H14.0598ZM9.94022 5.65875H9.04173C9.49857 5.27437 9.99959 4.97631 10.5322 4.78148C10.3225 5.02151 10.1243 5.31504 9.94022 5.65875ZM9.69012 6.17711C9.65422 6.25959 9.61887 6.34388 9.58438 6.43072C9.34815 7.02531 9.15435 7.69735 9.00651 8.42333H7.0992C7.45261 7.55653 7.9304 6.79357 8.50001 6.17711H9.69012ZM8.91034 8.94168C8.76271 9.82023 8.67964 10.7656 8.66709 11.7408H6.4227C6.4481 10.7468 6.61854 9.8014 6.90695 8.94168H8.91034ZM6.4227 12.2592H8.66709C8.67964 13.2344 8.76271 14.1798 8.91034 15.0583H6.90695C6.61854 14.1986 6.4481 13.2532 6.4227 12.2592ZM9.00651 15.5767C9.15435 16.3027 9.34811 16.9747 9.58438 17.5693C9.61887 17.6561 9.65422 17.7404 9.69012 17.8229H8.50001C7.93044 17.2064 7.45261 16.4435 7.0992 15.5767H9.00651ZM9.94022 18.3413C10.1243 18.685 10.3225 18.9785 10.5321 19.2185C9.99959 19.0237 9.49854 18.7256 9.04169 18.3413H9.94022ZM14.0598 18.3413H14.9583C14.5014 18.7256 14.0004 19.0237 13.4678 19.2185C13.6775 18.9785 13.8757 18.685 14.0598 18.3413ZM14.3099 17.8229C14.3458 17.7404 14.3811 17.6561 14.4156 17.5693C14.6519 16.9747 14.8456 16.3027 14.9935 15.5767H16.9008C16.5474 16.4435 16.0696 17.2064 15.5 17.8229H14.3099ZM15.0897 15.0583C15.2373 14.1798 15.3204 13.2344 15.3329 12.2592H17.5773C17.5519 13.2532 17.3815 14.1986 17.093 15.0583H15.0897ZM18.0959 11.7408C18.0724 10.7661 17.917 9.82096 17.6403 8.94168H18.8321C19.2232 9.81439 19.4436 10.7613 19.4767 11.7408H18.0959ZM18.5748 8.42333H17.4604C17.175 7.6743 16.7978 6.98174 16.3365 6.37032C16.2868 6.30448 16.2362 6.24038 16.1851 6.17711H16.6984C16.9034 6.34315 17.1012 6.52054 17.2903 6.70967C17.8052 7.22457 18.2354 7.8015 18.5748 8.42333ZM15.975 5.65875H15.7231C15.5993 5.5332 15.4723 5.41439 15.3423 5.30243C15.5585 5.41056 15.7695 5.52943 15.975 5.65875ZM8.27691 5.65875H8.02502C8.23046 5.52943 8.44154 5.41056 8.65766 5.30243C8.52772 5.41439 8.40069 5.5332 8.27691 5.65875ZM6.70967 6.70967C6.89883 6.52054 7.09654 6.34315 7.30156 6.17711H7.81488C7.7638 6.24038 7.71314 6.30448 7.66348 6.37032C7.20218 6.98174 6.82502 7.6743 6.53961 8.42333H5.42524C5.76463 7.8015 6.19476 7.22457 6.70967 6.70967ZM5.42524 15.5767H6.53961C6.82498 16.3257 7.20218 17.0183 7.66348 17.6297C7.71317 17.6955 7.7638 17.7596 7.81488 17.8229H7.30156C7.09657 17.6568 6.89883 17.4795 6.7097 17.2903C6.19476 16.7754 5.76463 16.1985 5.42524 15.5767ZM8.02502 18.3413H8.27691C8.40073 18.4668 8.52772 18.5856 8.65766 18.6976C8.44154 18.5894 8.23046 18.4706 8.02502 18.3413ZM15.7231 18.3413H15.975C15.7695 18.4706 15.5585 18.5894 15.3423 18.6976C15.4723 18.5856 15.5993 18.4668 15.7231 18.3413ZM17.2903 17.2903C17.1012 17.4795 16.9035 17.6568 16.6985 17.8229H16.1852C16.2362 17.7596 16.2869 17.6955 16.3366 17.6297C16.7979 17.0183 17.175 16.3257 17.4604 15.5767H18.5748C18.2354 16.1985 17.8052 16.7754 17.2903 17.2903Z"
            fill="white"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconWebsite;
