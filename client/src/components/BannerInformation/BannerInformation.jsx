import { useEffect, useState } from 'react';

import ButtonClose from '../UI/ButtonClose/ButtonClose';

import styles from './BannerInformation.module.css';

/**
 * Информационный баннер.
 *
 * @param {Object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние элементы для отображения внутри баннера.
 * @param {boolean} [props.initState=false] - Начальное состояние видимости баннера.
 * @param {string} [props.storageKey] - Название ключа в LC для хранения даты закрытия баннера.
 * @param {number} [props.marginBottom] - Отступ снизу от блока.
 * @returns {JSX.Element} Компонент информационного баннера.
 */
export default function BannerInformation({
  children,
  initState = false,
  marginBottom = 0,
  storageKey,
}) {
  // Состояние, отвечающее за видимость баннера.
  const [visible, setVisible] = useState(initState);

  useEffect(() => {
    setVisible(initState);
  }, [initState]);

  const handlerClose = () => {
    localStorage.setItem(storageKey, new Date().toISOString());
    setVisible(false);
  };

  return (
    visible && (
      <div className={styles.wrapper} style={marginBottom && { marginBottom }}>
        <ButtonClose getClick={handlerClose} scale={0.7} />
        {children}
      </div>
    )
  );
}
