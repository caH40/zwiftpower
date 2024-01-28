import { useDispatch } from 'react-redux';

import useBlockParameters from '../../../../hook/useBlockParameters';

import styles from './RInput.module.css';

/**
 * Интуп со свойствами на втором уровне
 */
function RInputNested({ subgroupIndex, label, type, property, disabled }) {
  const dispatch = useDispatch();
  const { inputHandler, blockWithParameters } = useBlockParameters(subgroupIndex);

  const { timeGapBetweenRowsMs, maxRows, maxRidersPerRow } = blockWithParameters()[property];

  return (
    <>
      <label className={styles.label}>
        {'timeGapBetweenRowsMs'}
        <input
          className={styles.input}
          type={type}
          value={timeGapBetweenRowsMs}
          onChange={(e) => {
            dispatch(
              inputHandler({
                [property]: {
                  timeGapBetweenRowsMs: e.target.value,
                  maxRows,
                  maxRidersPerRow,
                },
              })
            );
          }}
          disabled={disabled}
        />
      </label>
      <label className={styles.label}>
        {'maxRows'}
        <input
          className={styles.input}
          type={type}
          value={maxRows}
          onChange={(e) => {
            dispatch(
              inputHandler({
                [property]: {
                  timeGapBetweenRowsMs,
                  maxRows: e.target.value,
                  maxRidersPerRow,
                },
              })
            );
          }}
          disabled={disabled}
        />
      </label>
      <label className={styles.label}>
        {'maxRidersPerRow'}
        <input
          className={styles.input}
          type={type}
          value={maxRidersPerRow}
          onChange={(e) => {
            dispatch(
              inputHandler({
                [property]: {
                  timeGapBetweenRowsMs,
                  maxRows,
                  maxRidersPerRow: e.target.value,
                },
              })
            );
          }}
          disabled={disabled}
        />
      </label>
    </>
  );
}

export default RInputNested;
