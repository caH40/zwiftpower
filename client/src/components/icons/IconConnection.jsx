import cn from 'classnames';

import { addClasses as cns } from '../../utils/additional-classes';
import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

export default function IconConnection({
  isActive,
  addCls = ' ',
  color = 'green',
  tooltip,
  squareSize = 24,
}) {
  const activeColorFill = isActive ? styles.active__fill : undefined;
  return (
    <MyTooltip tooltip={tooltip}>
      <div
        className={cn(styles.box__rules, cns(styles, addCls))}
        style={{ width: squareSize, height: squareSize }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={activeColorFill}
            d="M17.5 12.5C17.5 11.8096 16.9404 11.25 16.25 11.25H15.625C11.828 11.25 8.75 14.328 8.75 18.125C8.75 21.922 11.828 25 15.625 25H21.875C25.672 25 28.75 21.922 28.75 18.125C28.75 15.0114 26.6801 12.3811 23.8412 11.5353C23.1372 11.3255 22.5 11.9111 22.5 12.6458V12.7104C22.5 13.3324 22.9681 13.8419 23.5431 14.0793C25.1319 14.735 26.25 16.2994 26.25 18.125C26.25 20.5412 24.2912 22.5 21.875 22.5H15.625C13.2087 22.5 11.25 20.5412 11.25 18.125C11.25 15.7088 13.2087 13.75 15.625 13.75H16.25C16.9404 13.75 17.5 13.1904 17.5 12.5Z"
            fill={color}
          />
          <path
            className={activeColorFill}
            d="M14.375 5C18.172 5 21.25 8.07804 21.25 11.875C21.25 15.672 18.172 18.75 14.375 18.75H13.75C13.0596 18.75 12.5 18.1904 12.5 17.5C12.5 16.8096 13.0596 16.25 13.75 16.25H14.375C16.7912 16.25 18.75 14.2912 18.75 11.875C18.75 9.45875 16.7912 7.5 14.375 7.5H8.125C5.70875 7.5 3.75 9.45875 3.75 11.875C3.75 13.7006 4.86814 15.265 6.45691 15.9207C7.03185 16.158 7.5 16.6676 7.5 17.2896V17.3542C7.5 18.0889 6.8628 18.6745 6.15874 18.4648C3.3199 17.6189 1.25 14.9886 1.25 11.875C1.25 8.07804 4.32804 5 8.125 5H14.375Z"
            fill={color}
          />
        </svg>
      </div>
    </MyTooltip>
  );
}
