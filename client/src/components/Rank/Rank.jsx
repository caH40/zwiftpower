import DSQBox from '../DSQBox/DSQBox';
import IconCupRank from '../icons/IconCupRank';

import styles from './Rank.module.css';

/**
 * Компонент отображения ранка (места) или причины дисквалификации.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {number} props.value - Значение ранка (место).
 * @param {{ status: boolean, reason: string, label: string }} [props.dsq] - Объект дисквалификации.
 */
export default function Rank({ value, disqualification, squareSize, tooltip }) {
  // Показываем иконку кубка за топ-3, если нет дисквалификации.
  if ([1, 2, 3].includes(value) && !disqualification) {
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
  if (disqualification) {
    return (
      <>
        {disqualification ? (
          <div className={styles.rank}>
            <DSQBox tooltip={`Дисквалификация: ${disqualification.reason}`}>
              {disqualification.label}
            </DSQBox>
          </div>
        ) : null}
      </>
    );
  }

  // Просто отображаем ранк (место).
  return <span>{value}</span>;
}
