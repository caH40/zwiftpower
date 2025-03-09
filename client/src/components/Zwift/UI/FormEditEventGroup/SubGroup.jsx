import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { jerseys } from '../../../../assets/zwift/raw/jerseys';
import { getAlert } from '../../../../redux/features/alertMessageSlice';
import { getTimerLocal } from '../../../../utils/date-local';
import BoxParameter from '../../../UI/ReduxUI/BoxParameter/BoxParameter';
import {
  removeGroupFromEvent,
  setEventRulesForGroup,
} from '../../../../redux/features/api/zwift_event_params/zwiftEventParamsSlice';
import IconDelete from '../../../icons/IconDelete';
import RCheckboxArray from '../../../UI/ReduxUI/RCheckbox/RCheckboxArray';
import { rulesPerGroup } from '../../../../assets/zwift/rule';

import styles from './FormEditEventGroup.module.css';

import MapBlock from './MapBlock';

const cx = classNames.bind(styles);

/**
 * Форма изменения настроек для подгрупп Эвента
 */
function SubGroup({ subGroup, groupNumber, isCreating }) {
  const { subgroupLabels } = useSelector((state) => state.eventParams);

  const dispatch = useDispatch();
  const quantityLeaders = subGroup?.invitedLeaders?.length;
  const quantitySweepers = subGroup?.invitedSweepers?.length;

  const removeGroup = (label, subgroupLabel) => {
    if (subgroupLabels.length === 1) {
      return dispatch(
        getAlert({ message: 'Нельзя удалять все группы!', type: 'error', isOpened: true })
      );
    }
    dispatch(
      getAlert({
        message: `Удалена группа "${subgroupLabel}"`,
        type: 'success',
        isOpened: true,
      })
    );

    return dispatch(removeGroupFromEvent(label));
  };

  return (
    <>
      {subGroup?.subgroupLabel ? (
        <div className={cx('group', subGroup.subgroupLabel)}>
          <div className={styles.box__delete}>
            <IconDelete
              getClick={() => removeGroup(groupNumber, subGroup?.subgroupLabel)}
              tooltip={`Удалить группу ${subGroup?.subgroupLabel}`}
            />
          </div>
          <h4 className={cx('title', `i${subGroup.subgroupLabel}`)}>
            Группа {subGroup.subgroupLabel}
          </h4>
          <div className={cx('form__group')}>
            <div className={cx('box__inputs')}>
              <BoxParameter
                title={'Дата и время старта'}
                sample={true}
                pen={true}
                inputParams={{
                  label: 'Дата и время старта',
                  property: 'eventSubgroupStart',
                  typeValue: 'dateAndTime',
                  type: 'inputTime',
                  value: subGroup.eventSubgroupStart,
                  subgroupIndex: groupNumber,
                }}
              >
                {getTimerLocal(subGroup.eventSubgroupStart, 'DDMMYYHms', true)}
              </BoxParameter>

              <BoxParameter
                title={'Название для группы'}
                sample={true}
                pen={true}
                inputParams={{
                  label: 'Название для группы',
                  property: 'name',
                  typeValue: 'text',
                  type: 'input',
                  subgroupIndex: groupNumber,
                }}
              >
                {subGroup.name}
              </BoxParameter>

              <BoxParameter
                title={'Описание для группы'}
                sample={true}
                pen={true}
                inputParams={{
                  label: 'Описание для группы',
                  property: 'description',
                  type: 'textarea',
                  subgroupIndex: groupNumber,
                }}
              >
                {subGroup.description}
              </BoxParameter>

              {!isCreating && (
                <BoxParameter
                  title={'Джерси для группы'}
                  sample={true}
                  pen={true}
                  inputParams={{
                    label: 'Джерси для группы',
                    property: 'jerseyHash',
                    type: 'selectId',
                    subgroupIndex: groupNumber,
                    options: [...jerseys].sort((a, b) =>
                      a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en')
                    ),
                  }}
                >
                  {jerseys.find((jersey) => jersey.id === subGroup.jerseyHash)?.name ||
                    'Джерси не найдена или не задана'}
                </BoxParameter>
              )}
            </div>

            <div className={cx('box__inputs')}>
              <BoxParameter
                title={'Приглашенные лидеры'}
                sample={true}
                pen={true}
                inputParams={{
                  label: 'Приглашенные лидеры',
                  type: 'leaders&sweepers',
                  property: 'invitedLeaders',
                  subgroupIndex: groupNumber,
                }}
              >
                {quantityLeaders === 0 && 'нет'}
                {subGroup.invitedLeaders.map((leader, index) => {
                  return (
                    <span className={cx('text__array')} key={leader}>
                      {leader}
                      {quantityLeaders === index + 1 ? '' : ','}
                    </span>
                  );
                })}
              </BoxParameter>

              <BoxParameter
                title={'Приглашенные замыкающие'}
                sample={true}
                pen={true}
                inputParams={{
                  label: 'Приглашенные замыкающие',
                  type: 'leaders&sweepers',
                  property: 'invitedSweepers',
                  subgroupIndex: groupNumber,
                }}
              >
                {quantitySweepers === 0 && 'нет'}
                {subGroup.invitedSweepers.map((leader, index) => {
                  return (
                    <span className={cx('text__array')} key={leader}>
                      {leader}
                      {quantitySweepers === index + 1 ? '' : ','}
                    </span>
                  );
                })}
              </BoxParameter>

              {/* Настройка устанавливается только при редактировании Эвента, а не при создании */}
              {/* Установка правил отдельно для каждой группы */}
              {!isCreating &&
                rulesPerGroup.map((checkboxTag) => (
                  <RCheckboxArray
                    reducer={setEventRulesForGroup}
                    key={checkboxTag.id}
                    label={checkboxTag.translate}
                    value={subGroup.rulesSet?.includes(checkboxTag.value) || false}
                    property={checkboxTag.value}
                    additions={{ subgroupKey: `eventSubgroup_${groupNumber}` }}
                  />
                ))}
            </div>

            <div className={cx('box__inputs')}>
              <MapBlock subGroup={subGroup} groupNumber={groupNumber} isCreating={isCreating} />
            </div>
          </div>
        </div>
      ) : undefined}
    </>
  );
}

export default SubGroup;
