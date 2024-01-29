import cn from 'classnames';

import { addClasses as cns } from '../../utils/additional-classes';

import styles from './icon.module.css';

function IconEventAdd({ isActive, addCls = ' ' }) {
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
          fill="#CECECE"
        />
        <path
          className={activeColorFill}
          d="M8.4 4.80005H7.45551C7.08492 4.80005 6.80152 5.08381 6.80152 5.45487V6.39345C6.14753 6.56807 5.49354 6.83 4.94854 7.17924L4.27275 6.50259C4.01115 6.24066 3.59696 6.26249 3.35716 6.50259L1.72218 8.13964C1.46058 8.40157 1.46058 8.81629 1.72218 9.05639L2.37617 9.71122C2.02738 10.3006 1.76578 10.9117 1.59138 11.5665H0.653992C0.283397 11.5665 0 11.8503 0 12.2214V14.5351C0 14.9061 0.283397 15.1899 0.653992 15.1899H1.59138C1.76578 15.8447 2.02738 16.4995 2.37617 17.0452L1.70038 17.7219C1.43878 17.9838 1.46058 18.3985 1.70038 18.6386L3.33536 20.2757C3.59696 20.5376 4.01115 20.5376 4.25095 20.2757L4.90494 19.6209C5.49354 19.9701 6.10393 20.232 6.75792 20.4066V21.3452C6.75792 21.7163 7.04132 22 7.41192 22H9.72269C10.0933 22 10.3767 21.7163 10.3767 21.3452V20.4066C11.0307 20.232 11.6847 19.9701 12.2297 19.6209L12.8837 20.2757C13.1453 20.5376 13.5594 20.5376 13.7992 20.2757L15.456 18.6386C15.7176 18.3767 15.7176 17.962 15.456 17.7001L14.802 17.0452C15.1508 16.4559 15.4124 15.8447 15.5868 15.1899L17.2 15.2117V12.265C17.2 11.894 16.9166 11.6102 16.546 11.6102H15.6086C15.4342 10.9554 15.1726 10.3006 14.8238 9.75487L15.4778 9.10005C15.5648 9.01292 15.6229 8.90889 15.652 8.8H9.11989C11.4511 9.05229 13.2542 11.0185 13.2542 13.4219C13.2542 15.9975 11.1615 18.0711 8.6109 18.0711C6.03853 18.0711 3.96755 15.9975 3.96755 13.4219C3.96755 10.917 5.92627 8.88698 8.4 8.7773V4.80005Z"
          fill="#CECECE"
        />
        <path
          className={activeColorFill}
          d="M11.9292 1.34859L10.4493 7.88572H9.25714L11.2789 0H12.0375L11.9292 1.34859ZM13.1587 7.88572L11.675 1.34859L11.5555 0H12.3216L14.3545 7.88572H13.1587ZM13.0914 4.95024V6.223H10.2176V4.95024H13.0914Z"
          fill="#CECECE"
        />
        <path
          className={activeColorFill}
          d="M16.5295 7.88572H15.3449L15.3524 6.61837H16.5295C16.8235 6.61837 17.0714 6.52268 17.2732 6.33132C17.475 6.13634 17.627 5.8529 17.7291 5.48101C17.8338 5.10911 17.8861 4.65958 17.8861 4.13242V3.74788C17.8861 3.34349 17.8562 2.98783 17.7964 2.68093C17.7391 2.37402 17.6532 2.11586 17.5386 1.90644C17.424 1.69702 17.2832 1.53995 17.1163 1.43524C16.9493 1.32692 16.7575 1.27276 16.5408 1.27276H15.3225V0H16.5408C16.9045 0 17.2371 0.0902669 17.5386 0.270801C17.8425 0.447724 18.1053 0.702276 18.3271 1.03446C18.5488 1.36664 18.7195 1.76381 18.8391 2.22598C18.9611 2.68454 19.0222 3.19545 19.0222 3.75871V4.13242C19.0222 4.69207 18.9611 5.20298 18.8391 5.66515C18.7195 6.12732 18.5488 6.52449 18.3271 6.85667C18.1078 7.18524 17.845 7.4398 17.5386 7.62033C17.2346 7.79725 16.8983 7.88572 16.5295 7.88572ZM15.9802 0V7.88572H14.8591V0H15.9802Z"
          fill="#CECECE"
        />
        <path
          className={activeColorFill}
          d="M21.5074 7.88572H20.3227L20.3302 6.61837H21.5074C21.8013 6.61837 22.0492 6.52268 22.251 6.33132C22.4528 6.13634 22.6048 5.8529 22.707 5.48101C22.8116 5.10911 22.8639 4.65958 22.8639 4.13242V3.74788C22.8639 3.34349 22.834 2.98783 22.7742 2.68093C22.7169 2.37402 22.631 2.11586 22.5164 1.90644C22.4018 1.69702 22.261 1.53995 22.0941 1.43524C21.9272 1.32692 21.7353 1.27276 21.5186 1.27276H20.3003V0H21.5186C21.8823 0 22.2149 0.0902669 22.5164 0.270801C22.8203 0.447724 23.0832 0.702276 23.3049 1.03446C23.5266 1.36664 23.6973 1.76381 23.8169 2.22598C23.939 2.68454 24 3.19545 24 3.75871V4.13242C24 4.69207 23.939 5.20298 23.8169 5.66515C23.6973 6.12732 23.5266 6.52449 23.3049 6.85667C23.0857 7.18524 22.8228 7.4398 22.5164 7.62033C22.2124 7.79725 21.8761 7.88572 21.5074 7.88572ZM20.958 0V7.88572H19.8369V0H20.958Z"
          fill="#CECECE"
        />
      </svg>
    </div>
  );
}

export default IconEventAdd;
