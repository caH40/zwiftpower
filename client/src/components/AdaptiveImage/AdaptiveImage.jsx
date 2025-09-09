import { useState } from 'react';

/**
 * Компонент для отображения адаптивного изображения.
 * Использует разные размеры изображений в зависимости от устройства пользователя.
 *
 * @param {Object} props - Свойства компонента.
 * @param {Object} [props.sources] - Объект с ссылками на разные размеры изображения (может быть undefined).
 * @param {string} [props.className] - Дополнительный CSS-класс.
 */
export function AdaptiveImage({
  sources,
  isCard,
  height,
  width,
  fallbackSrc = '/images/background-road-blur.jpg',
  ...propsImg
}) {
  const [imgSrc, setImgSrc] = useState(sources?.original || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  // Если sources нет или произошла ошибка — показываем дефолтное изображение.
  if (!sources || hasError) {
    return <img src={fallbackSrc} {...propsImg} height={height} width={width} />;
  }

  return isCard ? (
    <picture>
      <img
        src={sources.small || sources.original || fallbackSrc}
        {...propsImg}
        height={height}
        width={width}
        onError={handleError}
        alt={propsImg.alt || ''}
      />
    </picture>
  ) : (
    <picture>
      {sources.xLarge && <source srcSet={sources.xLarge} media="(min-width: 2000px)" />}
      {sources.large && <source srcSet={sources.large} media="(min-width: 1300px)" />}
      {sources.medium && (
        <source srcSet={sources.medium} media="(min-width: 768px) and (max-width: 1299px)" />
      )}
      {sources.small && <source srcSet={sources.small} media="(max-width: 767px)" />}

      <img
        src={imgSrc}
        {...propsImg}
        height={height}
        width={width}
        onError={handleError}
        alt={propsImg.alt || ''}
      />
    </picture>
  );
}
