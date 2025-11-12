import DSQBox from '../DSQBox/DSQBox';
import IconCupRank from '../icons/IconCupRank';

/**
 * Компонент отображения ранка (места) или причины дисквалификации.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {number} props.value - Значение ранка (место).
 * @param {{ status: boolean, reason: string, label: string }} [props.dsq] - Объект дисквалификации.
 */
export default function Rank({ value, dsq }) {
  // Показываем иконку кубка за топ-3, если нет дисквалификации.
  if ([1, 2, 3].includes(value) && !dsq?.status) {
    return <IconCupRank place={value} addCls="box__inline" />;
  }

  // Показываем метку дисквалификации.
  if (dsq?.status) {
    return (
      <DSQBox tooltip={dsq.reason} addCls="box__inline">
        {dsq.label ?? 'DSQ'}
      </DSQBox>
    );
  }

  // Просто отображаем ранк (место).
  return <span>{value}</span>;
}
