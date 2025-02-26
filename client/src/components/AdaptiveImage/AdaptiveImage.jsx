/**
 * Компонент для отображения адаптивного изображения.
 * Использует разные размеры изображений в зависимости от устройства пользователя.
 *
 * @param {Object} props - Свойства компонента.
 * @param {Object} [props.sources] - Объект с ссылками на разные размеры изображения (может быть undefined).
 * @param {string} [props.className] - Дополнительный CSS-класс.
 */
export function AdaptiveImage({ sources, height, width, ...propsImg }) {
  // Проверка наличия sources
  if (!sources) {
    return <img {...propsImg} />;
  }

  return (
    <picture>
      {/* Источник для изображений с размером для экранов 2K и выше */}
      {sources?.xLarge && <source srcSet={sources.xLarge} media="(min-width: 2000px)" />}

      {/* Источник для изображений большого размера (для FHD экранов и выше) */}
      {sources?.large && <source srcSet={sources.large} media="(min-width: 1300px)" />}

      {/* Источник для изображений среднего размера (для планшетов и ноутбуков) */}
      {sources?.medium && (
        <source srcSet={sources.medium} media="(min-width: 768px) and (max-width: 1299px)" />
      )}

      {/* Источник для изображений маленького размера (для мобильных устройств) */}
      {sources?.small && <source srcSet={sources.small} media="(max-width: 767px)" />}

      {/* Фолбек для случаев, если <picture> не поддерживается */}
      <img src={sources?.original} {...propsImg} height={height} width={width} />
    </picture>
  );
}
