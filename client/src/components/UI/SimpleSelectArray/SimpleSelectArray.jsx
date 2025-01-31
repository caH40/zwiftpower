import IconQuestion from '../../icons/IconQuestion';

import styles from '../SimpleSelect/SimpleSelect.module.css';

function SimpleSelectArray({ name, state, setState, property, disabled, options, question }) {
  return (
    <>
      <label className={styles.label}>
        <span>{name}:</span>
        {question && (
          <IconQuestion squareSize={question.squareSize} tooltip={question.tooltip} />
        )}
      </label>

      <div className={styles.wrapper__select}>
        <select
          className={styles.select}
          placeholder={name}
          value={options.find((option) => option.value === state[property])?.name || ''}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              [property]: options.find((option) => option.name === e.target.value)?.value,
            }))
          }
          disabled={disabled}
        >
          <option className={styles.option} value=""></option>
          {options.map((element) => (
            <option className={styles.option} value={element.name} key={element.id}>
              {element.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default SimpleSelectArray;
