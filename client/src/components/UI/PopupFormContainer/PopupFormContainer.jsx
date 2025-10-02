import { useDispatch, useSelector } from 'react-redux';

import ButtonClose from '../ButtonClose/ButtonClose';
import { closePopupFormContainer } from '../../../redux/features/popupFormContainerSlice';

import styles from './PopupFormContainer.module.css';

/**
 * Попап окно для формы из пропсов.
 */
export default function PopupFormContainer() {
  const { isVisible, formType } = useSelector((state) => state.popupFormContainer);

  const dispatch = useDispatch();

  const Form = {
    setCategory: <div>setCategory</div>,
    setPenalty: <div>setPenalty</div>,
    setDisqualification: <div>setDisqualification</div>,
  };

  return (
    <>
      {isVisible && (
        <div className={styles.wrapper}>
          <div className={styles.block} onClick={(e) => e.stopPropagation()}>
            <div className={styles.close}>
              <ButtonClose getClick={() => dispatch(closePopupFormContainer())} />
            </div>

            {formType && Form[formType]}
          </div>
        </div>
      )}
    </>
  );
}
