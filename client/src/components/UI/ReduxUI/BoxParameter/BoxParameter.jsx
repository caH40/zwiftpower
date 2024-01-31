import { useDispatch } from 'react-redux';

import { getPopupInput } from '../../../../redux/features/popupInputSlice';
import IconSample from '../../../icons/IconSample';
import IconPen from '../../../icons/IconPen';
import { setSameParameter } from '../../../../redux/features/api/zwift_event_params/zwiftEventParamsSlice';
import IconQuestion from '../../../icons/IconQuestion';
import { getAlert } from '../../../../redux/features/alertMessageSlice';

import styles from './BoxParameter.module.css';

function BoxParameter({ title, children, sample, pen, inputParams, description }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.parameter}>
      <div className={styles.box__title}>
        <h3 className={styles.title}>
          {title}
          {description && <IconQuestion squareSize={16} tooltip={description} />}
        </h3>
        <div className={styles.box__icons}>
          {sample && (
            <IconSample
              subgroupIndex={inputParams.subgroupIndex}
              squareSize={18}
              tooltip={'Применить ко всем группам'}
              getClick={() => {
                dispatch(
                  getAlert({
                    message: `Параметр "${inputParams.property}" установлен для всех групп!`,
                    type: 'success',
                    isOpened: open,
                  })
                );
                dispatch(
                  setSameParameter({
                    property: inputParams.property,
                    subgroupIndex: inputParams.subgroupIndex ?? 'eventMainParameter',
                  })
                );
              }}
            />
          )}
          {pen && (
            <IconPen
              squareSize={18}
              tooltip={'Изменить значение'}
              getClick={() => dispatch(getPopupInput({ isVisible: true, inputParams }))}
            />
          )}
        </div>
      </div>

      <div className={styles.value}>{children}</div>
    </div>
  );
}

export default BoxParameter;
