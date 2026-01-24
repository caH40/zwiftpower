import DSQBox from '../DSQBox/DSQBox';
import IconCupRank from '../icons/IconCupRank';

/**
 * Компонент отображения ранка (места) или причины дисквалификации.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {number} props.value - Значение ранка (место).
 * @param {{ status: boolean, reason: string, label: string }} [props.dsq] - Объект дисквалификации.
 */
export default function Rank({ value, dsq, squareSize, tooltip }) {
  // Показываем иконку кубка за топ-3, если нет дисквалификации.
  if ([1, 2, 3].includes(value) && !dsq) {
    return (
      <IconCupRank
        place={value}
        addCls="box__inline"
        squareSize={squareSize}
        tooltip={tooltip}
      />
    );
  }

  // Показываем метку дисквалификации.
  if (dsq) {
    return (
      <DSQBox tooltip={dsq.reason} addCls="box__inline">
        {dsq.label ?? 'DSQ'}
      </DSQBox>
    );
  }

  // Просто отображаем ранк (место).
  return <span>{value}</span>;
}
