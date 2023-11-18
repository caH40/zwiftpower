import { useDispatch, useSelector } from 'react-redux';
import { Transition } from 'react-transition-group';
import classNames from 'classnames/bind';

import RInput from '../ReduxUI/RInput/RInput';
import RTextarea from '../ReduxUI/RTextarea/RTextarea';
import { closePopupInput, resetPopupInput } from '../../../redux/features/popupInputSlice';
import ButtonClose from '../ButtonClose/ButtonClose';
import RSelect from '../ReduxUI/RSelect/RSelect';
import RInputTime from '../ReduxUI/RInputTime/RInputTime';
import RSelectId from '../ReduxUI/RSelect/RSelectId';

import styles from './PopupInput.module.css';

const cx = classNames.bind(styles);

/**
 * модальное окно изменения параметров Эвена
 */
function PopupInput() {
  const { isVisible, inputParams } = useSelector((state) => state.getPopupInput);

  const dispatch = useDispatch();

  const closePopup = () => dispatch(closePopupInput());

  return (
    <Transition
      in={isVisible}
      unmountOnExit
      timeout={250}
      onExited={() => dispatch(resetPopupInput())}
    >
      {(state) => (
        <div className={cx('wrapper', state)} onClick={closePopup}>
          <div className={styles.block} onClick={(e) => e.stopPropagation()}>
            <div className={styles.close}>
              <ButtonClose getClick={closePopup} />
            </div>

            {inputParams?.type === 'input' && (
              <RInput
                subgroupIndex={inputParams.subgroupIndex}
                label={inputParams.label}
                property={inputParams.property}
                type={inputParams.typeValue}
                disabled={inputParams.disabled}
              />
            )}
            {inputParams?.type === 'textarea' && (
              <RTextarea
                subgroupIndex={inputParams.subgroupIndex}
                label={inputParams.label}
                property={inputParams.property}
              />
            )}
            {inputParams?.type === 'select' && (
              <RSelect
                subgroupIndex={inputParams.subgroupIndex}
                label={inputParams.label}
                property={inputParams.property}
                type={inputParams.typeValue}
                options={inputParams.options}
              />
            )}
            {inputParams?.type === 'selectId' && (
              <RSelectId
                subgroupIndex={inputParams.subgroupIndex}
                label={inputParams.label}
                property={inputParams.property}
                type={inputParams.typeValue}
                options={inputParams.options}
              />
            )}
            {inputParams?.type === 'inputTime' && (
              <RInputTime
                subgroupIndex={inputParams.subgroupIndex}
                label={inputParams.label}
                value={inputParams.value}
                property={inputParams.property}
              />
            )}
          </div>
        </div>
      )}
    </Transition>
  );
}

export default PopupInput;
