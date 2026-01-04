import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closePopupFormContainer } from '../../../redux/features/popupFormContainerSlice';
import FormCategory from '../FormCategory/FormCategory';
import FormPenalty from '../FormTimePenalty/FormTimePenalty';
import PollResultsPopup from '../../PollResultsPopup/PollResultsPopup';
import TeamParticipantRatingModal from '../../TeamParticipantRatingModal/TeamParticipantRatingModal';
import CloseButton from '../Buttons/Close/CloseButton';

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
    setPenalty: <FormPenalty {...formProps} />,
    setDisqualification: <div>setDisqualification</div>,
    viewPollResults: <PollResultsPopup {...formProps} />,
    teamParticipantRatingModal: <TeamParticipantRatingModal {...formProps} />,
  };

  return (
    <>
      {isVisible && (
        <div className={styles.wrapper}>
          <div className={styles.block} onClick={(e) => e.stopPropagation()}>
            <div className={styles.closeButton}>
              <CloseButton onClick={() => dispatch(closePopupFormContainer())} />
            </div>
            {formType && Form[formType]}
          </div>
        </div>
      )}
    </>
  );
}
