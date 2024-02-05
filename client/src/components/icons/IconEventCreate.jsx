import cn from 'classnames';

import { addClasses as cns } from '../../utils/additional-classes';

import styles from './icon.module.css';

function IconEventCreate({ isActive, addCls = ' ' }) {
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
        <path
          className={activeColorFill}
          d="M11.6316 11.7349C10.6234 10.7575 9.13206 10.5336 7.89279 11.124L9.67818 12.8548C10.0773 13.2417 10.1403 13.8525 9.7832 14.3005C9.36311 14.8095 8.58594 14.8502 8.14484 14.4023L6.31744 12.6308C5.6873 13.8932 6.00237 15.4814 7.19964 16.4588C8.16585 17.2529 9.55215 17.3954 10.6864 16.866L16.1266 23.3003C16.8618 24.1758 18.206 24.2369 19.0252 23.4428C19.8444 22.6487 19.7814 21.3456 18.8782 20.6329L12.2617 15.3593C12.8709 14.1579 12.6398 12.7123 11.6316 11.7349ZM18.3951 22.8116C17.996 23.1985 17.3239 23.1985 16.9248 22.8116C16.5257 22.4247 16.5257 21.7732 16.9248 21.3863C17.3239 20.9994 17.996 20.9994 18.3951 21.3863C18.7942 21.7732 18.7942 22.4044 18.3951 22.8116Z"
          fill="#444444"
        />
        <path
          className={activeColorFill}
          d="M8.4 4.80005H7.45551C7.08492 4.80005 6.80152 5.08381 6.80152 5.45487V6.39345C6.14753 6.56807 5.49354 6.83 4.94854 7.17924L4.27275 6.50259C4.01115 6.24066 3.59696 6.26249 3.35716 6.50259L1.72218 8.13964C1.46058 8.40157 1.46058 8.81629 1.72218 9.05639L2.37617 9.71122C2.02738 10.3006 1.76578 10.9117 1.59138 11.5665H0.653992C0.283397 11.5665 0 11.8503 0 12.2214V14.5351C0 14.9061 0.283397 15.1899 0.653992 15.1899H1.59138C1.76578 15.8447 2.02738 16.4995 2.37617 17.0452L1.70038 17.7219C1.43878 17.9838 1.46058 18.3985 1.70038 18.6386L3.33536 20.2757C3.59696 20.5376 4.01115 20.5376 4.25095 20.2757L4.90494 19.6209C5.49354 19.9701 6.10393 20.232 6.75792 20.4066V21.3452C6.75792 21.7163 7.04132 22 7.41192 22H9.72269C10.0933 22 10.3767 21.7163 10.3767 21.3452V20.4066C11.0307 20.232 11.6847 19.9701 12.2297 19.6209L12.8837 20.2757C13.1453 20.5376 13.5594 20.5376 13.7992 20.2757L15.456 18.6386C15.7176 18.3767 15.7176 17.962 15.456 17.7001L14.802 17.0452C15.1508 16.4559 15.4124 15.8447 15.5868 15.1899L17.2 15.2117V12.265C17.2 11.894 16.9166 11.6102 16.546 11.6102H15.6086C15.4342 10.9554 15.1726 10.3006 14.8238 9.75487L15.4778 9.10005C15.5648 9.01292 15.6229 8.90889 15.652 8.8H9.11989C11.4511 9.05229 13.2542 11.0185 13.2542 13.4219C13.2542 15.9975 11.1615 18.0711 8.6109 18.0711C6.03853 18.0711 3.96755 15.9975 3.96755 13.4219C3.96755 10.917 5.92627 8.88698 8.4 8.7773V4.80005Z"
          fill="#444444"
        />
        <path
          className={activeColorFill}
          d="M12.8214 5.23607H14.0216C13.9975 5.7523 13.8891 6.21059 13.6965 6.61094C13.5065 7.01128 13.2402 7.32383 12.8977 7.54858C12.5579 7.77334 12.1485 7.88571 11.6695 7.88571C11.2948 7.88571 10.959 7.80143 10.662 7.63287C10.365 7.46079 10.1108 7.21496 9.89936 6.89539C9.69064 6.57582 9.53142 6.18952 9.42171 5.7365C9.312 5.28348 9.25714 4.77603 9.25714 4.21414V3.68211C9.25714 3.12022 9.31334 2.61277 9.42572 2.15975C9.54079 1.70322 9.70402 1.31516 9.91541 0.995591C10.1295 0.676019 10.385 0.430194 10.6821 0.258116C10.9791 0.0860387 11.3109 0 11.6775 0C12.1645 0 12.5753 0.115889 12.9097 0.347667C13.2469 0.579445 13.5078 0.899017 13.6924 1.30638C13.8798 1.71375 13.9921 2.17731 14.0296 2.69705H12.8255C12.8121 2.38801 12.7652 2.12639 12.685 1.91217C12.6047 1.69444 12.4829 1.53114 12.3197 1.42227C12.1592 1.3099 11.9451 1.25371 11.6775 1.25371C11.4768 1.25371 11.3015 1.30287 11.1517 1.4012C11.0018 1.49953 10.8761 1.64878 10.7744 1.84896C10.6727 2.04913 10.5964 2.30198 10.5456 2.6075C10.4974 2.90951 10.4733 3.2642 10.4733 3.67157V4.21414C10.4733 4.61097 10.4961 4.9604 10.5416 5.26241C10.5871 5.56091 10.6566 5.81376 10.7503 6.02096C10.8466 6.22464 10.9697 6.37916 11.1196 6.48451C11.2721 6.58635 11.4554 6.63727 11.6695 6.63727C11.921 6.63727 12.1284 6.5846 12.2916 6.47924C12.4548 6.37389 12.5793 6.21762 12.6649 6.01042C12.7532 5.80323 12.8054 5.54511 12.8214 5.23607Z"
          fill="#444444"
        />
        <path
          className={activeColorFill}
          d="M14.8123 0.110621H16.9918C17.4387 0.110621 17.8227 0.198416 18.1438 0.374005C18.4676 0.549594 18.7164 0.809467 18.8904 1.15362C19.0643 1.49778 19.1513 1.92095 19.1513 2.42313C19.1513 2.83401 19.0978 3.18695 18.9907 3.48194C18.8864 3.77341 18.7378 4.01748 18.5452 4.21414C18.3552 4.40729 18.1318 4.56181 17.8749 4.6777L17.4936 4.94108H15.599L15.591 3.70845H16.9999C17.2112 3.70845 17.3865 3.65928 17.5257 3.56095C17.6648 3.46262 17.7692 3.32566 17.8387 3.15007C17.911 2.97448 17.9471 2.7708 17.9471 2.53902C17.9471 2.2932 17.9123 2.08073 17.8428 1.90163C17.7732 1.72253 17.6675 1.58557 17.5257 1.49075C17.3838 1.39593 17.2059 1.34853 16.9918 1.34853H16.0165V7.78036H14.8123V0.110621ZM18.0796 7.78036L16.747 4.36164L18.0194 4.3511L19.368 7.70661V7.78036H18.0796Z"
          fill="#444444"
        />
        <path
          className={activeColorFill}
          d="M24 6.54772V7.78036H20.8893V6.54772H24ZM21.2826 0.110621V7.78036H20.0785V0.110621H21.2826ZM23.5946 3.23435V4.43539H20.8893V3.23435H23.5946ZM23.996 0.110621V1.34853H20.8893V0.110621H23.996Z"
          fill="#444444"
        />
      </svg>
    </div>
  );
}

export default IconEventCreate;
