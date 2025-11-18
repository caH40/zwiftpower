import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closePopupFormContainer } from '../../../redux/features/popupFormContainerSlice';
import FormCategory from '../FormCategory/FormCategory';
import PollResults from '../../PollResults/PollResults';

import styles from './PopupFormContainer.module.css';

/**
 * Попап окно для формы из пропсов.
 */
export default function PopupFormContainer() {
  const { isVisible, formType, formProps } = useSelector((state) => state.popupFormContainer);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        dispatch(closePopupFormContainer());
      }
    };

    window.addEventListener('keyup', handleEscKey);

    return () => {
      window.removeEventListener('keyup', handleEscKey);
    };
  }, [dispatch]);

  const Form = {
    setCategory: <FormCategory {...formProps} />,
    setPenalty: <div>setPenalty</div>,
    setDisqualification: <div>setDisqualification</div>,
    viewPollResults: <PollResults {...formProps} />,
  };

  return (
    <>
      {isVisible && (
        <div className={styles.wrapper}>
          <div className={styles.block} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeButton}
              onClick={() => dispatch(closePopupFormContainer())}
            >
              ×
            </button>

            {formType && Form[formType]}
          </div>
        </div>
      )}
    </>
  );
}
