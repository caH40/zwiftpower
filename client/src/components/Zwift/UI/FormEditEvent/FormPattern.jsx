import { optionsEventPattern } from '../../../../assets/options';
import SimpleSelectFunction from '../../../UI/SimpleSelect/SimpleSelectFunction';

import styles from './FormEditEvent.module.css';

/**
 * Выбор паттерна настроек для Эвента (набор правил заранее сохраненный)
 * activatePattern - редьюсер для установки правил паттерна
 */
function FormPattern({ activatePattern }) {
  return (
    <>
      <h4 className={styles.title}>Выбор пакета настроек для Эвента</h4>
      <SimpleSelectFunction reducer={activatePattern} options={optionsEventPattern} />
    </>
  );
}

export default FormPattern;
