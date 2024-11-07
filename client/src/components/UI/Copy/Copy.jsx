import { useDispatch } from 'react-redux';

import { getAlert } from '../../../redux/features/alertMessageSlice';

import styles from './Copy.module.css';

/**
 * При клике информация копируется в буфер
 * @param {{children:string, name:string, showValue?:boolean, color?:string}} пропсы
 * @param children только текст без html тэгов,
 * @param name только текст без html тэгов,
 * @param showValue показывать значение или текст "copy",
 * @param color цвет текса children,
 * @returns
 */
function Copy({ children, name, showValue, color }) {
  const dispatch = useDispatch();

  const copyText = () => {
    navigator.clipboard
      .writeText(children)
      .then(() => {
        dispatch(
          getAlert({
            message: `${name} скопирован в буфер обмена`,
            type: 'success',
            isOpened: true,
          })
        );
      })
      .catch(() => {
        dispatch(
          getAlert({
            message: 'Ошибка при копировании в буфер обмена',
            type: 'error',
            isOpened: true,
          })
        );
      });
  };
  return (
    <span className={styles.box} style={color && { color }} onClick={copyText}>
      {showValue ? children : 'copy'}
    </span>
  );
}

export default Copy;
