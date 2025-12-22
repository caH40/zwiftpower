import BoxParameter from '../../../UI/ReduxUI/BoxParameter/BoxParameter';
import { getNameSelected } from '../../../../utils/name-selected';
import { importanceCoefficients } from '../../../../assets/options';

import styles from './FormEditEvent.module.css';

/**
 * Форма изменения внутренних настроек для Эвента для сайта zpru.
 * Форма используется только при редактировании Эвента
 */
export default function FormEditLocalEventParams({
  importanceLevel,
  typeRaceCustom,
  configsFinishProtocol,
  eventType,
}) {
  const currentImportanceCoefficients = getCurrentImportanceCoefficients(eventType);

  return (
    <>
      <h4 className={styles.title}>Настройки заезда для zwiftpower.ru</h4>
      <div className={styles.form} name="zwiftEvent">
        <div className={styles.box__inputs}>
          {/* Конфигурация финишного протокола */}
          <BoxParameter
            title={'Конфигурация финишного протокола'}
            pen={true}
            inputParams={{
              property: 'typeRaceCustom',
              type: 'select',
              options: configsFinishProtocol,
            }}
          >
            {/* Если отображается идентификатор вместо displayName, значит в  */}
            {/* массиве configsFinishProtocol нет элемента с таким идентификатором  */}
            {getNameSelected(configsFinishProtocol, typeRaceCustom)}
          </BoxParameter>

          {/*  */}
          <BoxParameter
            title={'Коэффициент важности заезда'}
            pen={true}
            inputParams={{
              property: 'importanceLevel',
              type: 'select',
              options: currentImportanceCoefficients,
            }}
            description={
              'Внимание! Для заездов типа Ride автоматически будет выбираться "Не рейтинговый" коэффициент. Если Race и дистанция меньше 10км, тогда автоматически будет выбираться "Спринт" коэффициент!'
            }
          >
            {/* Если отображается идентификатор вместо displayName, значит в  */}
            {/* массиве нет элемента с таким идентификатором  */}
            {getNameSelected(importanceCoefficients, importanceLevel)}
          </BoxParameter>
        </div>
      </div>
    </>
  );
}

function getCurrentImportanceCoefficients(eventType) {
  if (['GROUP_RIDE', 'EVENT_TYPE_GROUP_RIDE'].includes(eventType)) {
    return importanceCoefficients.filter(({ name }) => name === 'unrated');
  }

  return importanceCoefficients;
}
