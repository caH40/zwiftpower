import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RInput from '../ReduxUI/RInput/RInput';
import RTextarea from '../ReduxUI/RTextarea/RTextarea';
import { closePopupInput } from '../../../redux/features/popupInputSlice';
import ButtonClose from '../ButtonClose/ButtonClose';
import RSelect from '../ReduxUI/RSelect/RSelect';
import RInputTime from '../ReduxUI/RInputTime/RInputTime';

import styles from './PopupInput.module.css';

function PopupInput() {
  const { isVisible, inputParams } = useSelector((state) => state.getPopupInput);
  const { eventMainParams } = useSelector((state) => state.eventParams);

  const dispatch = useDispatch();

  const closePopup = () => dispatch(closePopupInput());

  return (
    <>
      {isVisible && (
        <div className={styles.wrapper} onClick={closePopup}>
          <div className={styles.block} onClick={(e) => e.stopPropagation()}>
            <div className={styles.close}>
              <ButtonClose getClick={closePopup} />
            </div>

            {inputParams?.type === 'input' && (
              <RInput
                label={inputParams.label}
                value={eventMainParams[inputParams.property]}
                property={inputParams.property}
                type={inputParams.typeValue}
                disabled={inputParams.disabled}
              />
            )}
            {inputParams?.type === 'textarea' && (
              <RTextarea
                label={inputParams.label}
                value={eventMainParams[inputParams.property]}
                property={inputParams.property}
              />
            )}
            {inputParams?.type === 'select' && (
              <RSelect
                label={inputParams.label}
                value={eventMainParams[inputParams.property]}
                property={inputParams.property}
                type={inputParams.typeValue}
                options={inputParams.options}
              />
            )}
            {inputParams?.type === 'inputTime' && (
              <RInputTime
                label={inputParams.label}
                value={eventMainParams[inputParams.property]}
                property={inputParams.property}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default PopupInput;
