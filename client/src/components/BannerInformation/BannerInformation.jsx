import { useState } from 'react';

import ButtonClose from '../UI/ButtonClose/ButtonClose';

import styles from './BannerInformation.module.css';

/**
 * Информационный баннер.
 *
 * @param {Object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние элементы для отображения внутри баннера.
 * @param {boolean} [props.initState=false] - Начальное состояние видимости баннера.
 * @param {string} [props.colorSchema] - Схема цветов для баннера. В разработке.
 * @param {number} [props.marginBottom] - Отступ снизу от блока.
 * @returns {JSX.Element} Компонент информационного баннера.
 */
export default function BannerInformation({
  children,
  initState = false,
  colorSchema,
  marginBottom = 0,
}) {
  // Состояние, отвечающее за видимость баннера.
  const [visible, setVisible] = useState(initState);

  return (
    visible && (
      <div className={styles.wrapper} style={marginBottom && { marginBottom }}>
        <ButtonClose getClick={() => setVisible(false)} scale={0.7} />
        {children}
      </div>
    )
  );
}
