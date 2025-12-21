import { useDispatch } from 'react-redux';

import BoxParameter from '../../../UI/ReduxUI/BoxParameter/BoxParameter';
import { getNameSelected } from '../../../../utils/name-selected';
import { importanceCoefficients } from '../../../../assets/options';

import styles from './FormEditEvent.module.css';

/**
 * Форма изменения внутренних настроек для Эвента для сайта zpru.
 * Форма используется только при редактировании Эвента
 */
export default function FormEditZpruEventParams({
  importanceLevel,
  typeRaceCustom,
  configsFinishProtocol,
}) {
  const dispatch = useDispatch();

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
              options: importanceCoefficients,
            }}
            description={
              'Внимание! Для заездов типа Ride автоматически будет выбираться "Не рейтинговый" коэффициент'
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
