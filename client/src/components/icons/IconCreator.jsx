import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconCreator({ squareSize = 24, toolTip }) {
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
          <g clipPath="url(#clip0_451_45)">
            <path
              d="M22.8892 10.755L21.6329 10.4788C21.396 10.4269 21.2142 10.2407 21.164 10.0034C20.9651 9.06375 20.6262 8.17622 20.1687 7.36378C20.0568 7.16522 20.0639 6.92138 20.1868 6.72942L20.955 5.53008C21.1114 5.286 21.0768 4.96603 20.8718 4.76105L19.597 3.48619C19.392 3.2812 19.0722 3.24661 18.8281 3.40289L17.7558 4.08947C17.5519 4.22002 17.291 4.21828 17.0875 4.0867C16.2992 3.57628 15.4293 3.18141 14.5016 2.92556C14.2815 2.86486 14.1131 2.68725 14.0642 2.46413L13.761 1.07583C13.6989 0.792656 13.448 0.585938 13.1582 0.585938H11.3551C11.0653 0.585938 10.8145 0.792656 10.7526 1.07583L10.4777 2.33142C10.4262 2.56706 10.2416 2.75133 10.006 2.80256C9.06919 3.00656 8.18494 3.35133 7.37592 3.81277C7.1768 3.9262 6.93159 3.92062 6.73851 3.79702L5.52764 3.02161C5.28356 2.86542 4.9635 2.90011 4.75861 3.105L3.48366 4.38C3.27867 4.58489 3.24408 4.905 3.40036 5.14908L4.10962 6.25669C4.23951 6.45947 4.23853 6.71878 4.10887 6.92184C3.61312 7.69838 3.2288 8.55277 2.9783 9.4627C2.91759 9.68316 2.74008 9.85181 2.51667 9.90089L1.07451 10.2161C0.791343 10.2783 0.585983 10.5291 0.585983 10.8189V12.6218C0.585983 12.9117 0.791343 13.1625 1.07451 13.2246L2.39301 13.5132C2.62805 13.5647 2.81161 13.7485 2.86355 13.9834C3.06525 14.8952 3.40069 15.757 3.84694 16.5475C3.95925 16.7464 3.95325 16.9906 3.83001 17.183L3.01922 18.4495C2.86284 18.6935 2.89758 19.0135 3.10256 19.2185L4.37751 20.4934C4.5825 20.6983 4.90242 20.733 5.1465 20.5766L6.29681 19.8401C6.50006 19.7099 6.7598 19.7114 6.96314 19.8416C7.7257 20.3301 8.56369 20.7109 9.45586 20.963C9.67467 21.0248 9.84159 21.2016 9.8902 21.4235L10.2136 22.8906C10.2757 23.1736 10.5265 23.3672 10.8163 23.3672H12.6194C12.9092 23.3672 13.1599 23.1736 13.222 22.8906L13.5121 21.5713C13.5639 21.335 13.7495 21.1538 13.9859 21.1029C14.9006 20.9062 15.7657 20.5769 16.5597 20.1344C16.758 20.0238 17.0007 20.0312 17.192 20.1537L18.4469 20.9575C18.6909 21.1139 19.0109 21.0792 19.2158 20.8743L20.4908 19.5994C20.6956 19.3945 20.7303 19.0745 20.5741 18.8304L19.8601 17.7157C19.7294 17.5114 19.7315 17.2499 19.8636 17.0464C20.3667 16.272 20.7581 15.4183 21.0155 14.5084C21.0775 14.2899 21.2543 14.1233 21.4759 14.0749L22.8891 13.7634C23.1722 13.7014 23.367 13.4506 23.367 13.1608V11.3577C23.3672 11.0679 23.1724 10.8172 22.8892 10.755ZM11.9253 19.1056C8.06859 19.1056 4.94194 15.979 4.94194 12.1222C4.94194 8.26542 8.06855 5.13881 11.9253 5.13881C15.7821 5.13881 18.9086 8.26542 18.9086 12.1222C18.9086 15.979 15.7821 19.1056 11.9253 19.1056Z"
              fill="black"
            />
            <path
              d="M9.22106 11.1404C9.82959 11.1404 10.3228 10.647 10.3228 10.0386C10.3228 9.43008 9.82964 8.93677 9.22106 8.93677C8.61262 8.93677 8.11931 9.43003 8.11931 10.0386C8.11931 10.647 8.61257 11.1404 9.22106 11.1404Z"
              fill="black"
            />
            <path
              d="M14.8215 11.1404C15.43 11.1404 15.9232 10.647 15.9232 10.0386C15.9232 9.43008 15.4301 8.93677 14.8215 8.93677C14.2131 8.93677 13.7197 9.43003 13.7197 10.0386C13.7197 10.647 14.2131 11.1404 14.8215 11.1404Z"
              fill="black"
            />
            <path
              d="M12.0171 11.8504C12.6256 11.8504 13.1189 11.3571 13.1189 10.7486C13.1189 10.14 12.6256 9.64673 12.0171 9.64673C11.4085 9.64673 10.9152 10.14 10.9152 10.7486C10.9152 11.3571 11.4085 11.8504 12.0171 11.8504Z"
              fill="black"
            />
            <path
              d="M11.9766 12.2871C10.7986 12.2871 9.86719 13.242 9.86719 14.4198V14.8577C9.86719 14.943 9.94284 15.0235 10.0283 15.0235H13.9848C14.07 15.0235 14.0859 14.943 14.0859 14.8577V14.4198C14.0859 13.242 13.1545 12.2871 11.9766 12.2871Z"
              fill="black"
            />
            <path
              d="M10.6218 12.1234C10.2463 11.7894 9.71737 11.5815 9.17564 11.5815C7.99753 11.5815 7.00781 12.5325 7.00781 13.7095V14.1472C7.00781 14.2327 7.14694 14.3202 7.23244 14.3202H9.34941C9.39619 13.3359 9.89222 12.5918 10.6218 12.1234Z"
              fill="black"
            />
            <path
              d="M14.8122 11.5771C14.268 11.5771 13.7731 11.7915 13.397 12.1266C14.1236 12.5948 14.6169 13.336 14.6637 14.3204H16.7889C16.8743 14.3204 16.9453 14.2329 16.9453 14.1474V13.7097C16.9453 13.1212 16.7062 12.5875 16.3203 12.2026C15.9342 11.8155 15.4017 11.5771 14.8122 11.5771Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_451_45">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconCreator;
