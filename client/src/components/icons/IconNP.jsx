import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconNP({ squareSize = 24, tooltip }) {
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
          <path
            d="M12.7191 6L11.1545 18H9.01923L6.44219 11.6953H6.38697L5.55863 18H3L4.56463 6H6.73671L9.27694 12.2813H9.35057L10.1605 6H12.7191Z"
            fill="black"
          />
          <path
            d="M12.3648 18L13.9294 6H17.9975C18.6969 6 19.286 6.17578 19.7646 6.52734C20.2432 6.87891 20.5868 7.37305 20.7954 8.00977C21.004 8.64648 21.0531 9.39063 20.9427 10.2422C20.8322 11.1094 20.5868 11.8574 20.2064 12.4863C19.829 13.1113 19.3473 13.5938 18.7614 13.9336C18.1785 14.2695 17.525 14.4375 16.801 14.4375H14.3712L14.7025 11.9063H16.6169C16.9237 11.9063 17.1937 11.8398 17.4268 11.707C17.66 11.5703 17.8487 11.3789 17.9929 11.1328C18.1371 10.8828 18.2306 10.5859 18.2736 10.2422C18.3165 9.89844 18.2966 9.60547 18.2138 9.36328C18.134 9.11719 17.9959 8.92969 17.7996 8.80078C17.6063 8.66797 17.3593 8.60156 17.0587 8.60156H16.1567L14.9234 18H12.3648Z"
            fill="black"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconNP;
