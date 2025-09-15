/**
 * Рендер карточек скелетонов загрузки
 */
export function renderSkeletonCards({ count = 1, SkeletonComponent, status }) {
  return Array.from({ length: count }, (_, i) => i).map((key) => (
    <SkeletonComponent key={key} status={status} />
  ));
}
