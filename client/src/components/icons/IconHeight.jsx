import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconHeight({ squareSize = 24, toolTip }) {
  return (
    <MyTooltip toolTip={toolTip}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5 2C14.6716 2 14 2.67159 14 3.5C14 4.32841 14.6716 5 15.5 5C16.3284 5 17 4.32841 17 3.5C17.004 2.67153 16.3324 2 15.5 2Z"
            fill="#464646"
          />
          <path
            d="M15.4965 1C14.1182 1 13 2.12243 13 3.49823C13 4.87751 14.1216 6 15.5 6C16.8784 6 18 4.87757 18 3.49823C17.9999 2.12243 16.8748 1 15.4965 1ZM15.4965 4.81416C14.7721 4.81416 14.1849 4.22654 14.1849 3.50171C14.1849 2.77689 14.7721 2.18927 15.4965 2.18927C16.2208 2.18927 16.808 2.77689 16.808 3.50171C16.8115 4.22654 16.2243 4.81416 15.4965 4.81416Z"
            fill="black"
          />
          <path
            d="M19 8.00336C19 7.45172 18.5606 7.0043 18.0189 7.0043H17.6563L16.1633 10.6964C15.9074 11.3175 15.0756 11.2785 14.8324 10.6964L13.3394 7H12.9811C12.4394 7 12 7.44742 12 7.99469V16H18.9957V8.00336H19Z"
            fill="#464646"
          />
          <path
            d="M13.0045 22H15V19C15 18.6014 15.0785 18.5 15.5 18.5C15.917 18.5 16 18.5971 16 19V22H18V16H13V22H13.0045Z"
            fill="#464646"
          />
          <path
            d="M17.8488 6.75269H17.0703C16.8015 6.75269 16.5565 6.90483 16.4577 7.12942L15.5212 9.21601L14.5806 7.12942C14.4778 6.90118 14.2368 6.75269 13.9681 6.75269H13.1856C11.9486 6.75269 10.9448 7.67645 10.9448 8.80672V16.0954C10.9448 16.4323 11.2412 16.7076 11.6127 16.7076H11.9842V22.3878C11.9842 22.7247 12.2805 23 12.652 23H18.3902C18.7577 23 19.0581 22.7284 19.0581 22.3878V16.7075H19.4256C19.7931 16.7075 20.0935 16.4359 20.0935 16.0953V8.81031C20.0935 7.6764 19.0858 6.75269 17.8488 6.75269ZM17.7224 21.7792H16.189V18.939C16.189 18.6022 15.8926 18.3268 15.5212 18.3268C15.1536 18.3268 14.8533 18.5985 14.8533 18.939V21.7792H13.3199V16.7075H17.7263V21.7792H17.7224ZM12.2727 15.4867V8.81031C12.2727 8.35024 12.6798 7.97709 13.1817 7.97709H13.5176L14.9007 11.0599C15.126 11.5454 15.8966 11.5779 16.1338 11.0599L17.5169 7.98068H17.8528C18.3547 7.98068 18.7618 8.35383 18.7618 8.81389V15.4903H12.2727V15.4867Z"
            fill="black"
          />
          <path
            d="M8.12709 2.22446C8.49461 2.22446 8.79494 1.9528 8.79494 1.61226C8.79494 1.27172 8.4907 1 8.12709 1H4.57432C4.2068 1 3.90646 1.27167 3.90646 1.6122V22.3877C3.90646 22.7246 4.20283 22.9999 4.57432 22.9999H8.12709C8.49461 22.9999 8.79494 22.7283 8.79494 22.3877C8.79494 22.0508 8.49858 21.7755 8.12709 21.7755H5.24615V20.0621H8.12709C8.49461 20.0621 8.79494 19.7904 8.79494 19.4499C8.79494 19.1094 8.49858 18.8377 8.12709 18.8377H5.24615V17.0409H6.62142C6.98895 17.0409 7.28928 16.7691 7.28928 16.4287C7.28928 16.0882 6.99292 15.8165 6.62142 15.8165H5.24615V14.1138H8.12709C8.49461 14.1138 8.79494 13.8421 8.79494 13.5016C8.79494 13.1647 8.49858 12.8894 8.12709 12.8894H5.24615V11.0925H6.62142C6.98895 11.0925 7.28928 10.8209 7.28928 10.4803C7.28928 10.1434 6.99292 9.86813 6.62142 9.86813H5.24615V8.16914H8.12709C8.49461 8.16914 8.79494 7.89748 8.79494 7.55694C8.79494 7.22005 8.49858 6.94474 8.12709 6.94474H5.24615V5.14427H6.62142C6.98895 5.14427 7.28928 4.8726 7.28928 4.53207C7.28928 4.19153 6.99292 3.91986 6.62142 3.91986H5.24615V2.19908H8.12709V2.22446Z"
            fill="black"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconHeight;
