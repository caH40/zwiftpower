import cn from 'classnames';

import { addClasses as cns } from '../../utils/additional-classes';

import styles from './icon.module.css';

function IconProfile({ isActive, addCls = ' ' }) {
  const activeColorFill = isActive ? styles.active__fill : undefined;
  return (
    <div className={cn(styles.box, cns(styles, addCls))}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1075_21)">
          <path
            className={activeColorFill}
            d="M12 2.02844C5.37252 2.02844 0 7.40096 0 14.0285C0 16.9164 1.02073 19.5661 2.72046 21.6367C2.9827 19.537 5.07986 17.7611 8.02057 16.9201C9.09492 17.9211 10.4827 18.5285 12 18.5285C13.4816 18.5285 14.8421 17.9517 15.9056 16.9927C18.8717 17.9072 20.9238 19.7868 20.9913 21.9716C22.862 19.8552 24 17.0755 24 14.0285C24 7.40096 18.6275 2.02844 12 2.02844ZM12 17.1074C11.234 17.1074 10.5122 16.8969 9.87121 16.5324C8.32663 15.6535 7.26315 13.8549 7.26315 11.7784C7.26315 8.84 9.38804 6.44933 12 6.44933C14.6123 6.44933 16.7369 8.84 16.7369 11.7784C16.7369 13.8868 15.6402 15.7076 14.0571 16.5712C13.4335 16.9113 12.7377 17.1074 12 17.1074Z"
            fill="#CECECE"
          />
        </g>
        <defs>
          <clipPath id="clip0_1075_21">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default IconProfile;
