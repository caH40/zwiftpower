import styles from './TdImage.module.css';

/**
 * Контейнер изображения для ячейки таблицы `<td>`.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {string} [props.url] - URL изображения.
 * @param {number} [props.width=50] - Ширина изображения.
 * @param {number} [props.height=35] - Высота изображения.
 * @param {React.CSSProperties} [props.layoutStyle] - Стили для контейнера изображения.
 * @param {React.ImgHTMLAttributes<HTMLImageElement>} [props.props] - Дополнительные пропсы для элемента `<img>`.
 * @returns {JSX.Element} Компонент изображения для ячейки таблицы.
 */
export default function TdImage({ url, width = 50, height = 35, layoutStyle, ...props }) {
  return (
    <div className={styles.wrapper} style={layoutStyle}>
      {url ? (
        <img
          src={url}
          width={width}
          height={height}
          {...props}
          className={styles.img}
          alt={props.alt || 'Изображение'}
        />
      ) : (
        <div className={styles.empty} style={{ width, height }}>
          нет
        </div>
      )}
    </div>
  );
}
