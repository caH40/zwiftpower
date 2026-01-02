import { useDispatch } from 'react-redux';

import { openPopupFormContainer } from '../../../redux/features/popupFormContainerSlice';
import IconCategory from '../../icons/IconCategory';
import DSQBox from '../../DSQBox/DSQBox';

import styles from './PopupMenuTable.module.css';

/**
 * popup меню для взаимодействия с выбранным Эвентом на странице Расписания Эвентов
 */
function PopupMenuTableStageResult({
  showMenu,
  setShowMenu,
  category,
  categoryInRace,
  modifiedCategory,
  disqualification,
  penalty,
  profile,
  seriesId,
  stageResultId,
  urlSlug,
  stageOrder,
}) {
  const dispatch = useDispatch();

  return (
    <>
      {showMenu && (
        <div className={styles.popup} onMouseLeave={() => setShowMenu(false)}>
          <ul className={styles.list}>
            <li
              className={styles.item}
              onClick={() =>
                dispatch(
                  openPopupFormContainer({
                    formType: 'setCategory', // мапинг в компоненте PopupFormContainer
                    formProps: {
                      category,
                      categoryInRace,
                      modifiedCategory,
                      profile,
                      seriesId,
                      stageResultId,
                      urlSlug,
                      stageOrder,
                    },
                  })
                )
              }
            >
              <IconCategory />
              <span className={styles.label}>Изменение категории</span>
            </li>

            <li
              className={styles.item}
              onClick={() =>
                dispatch(openPopupFormContainer({ formType: 'setDisqualification' }))
              }
            >
              <DSQBox>DSQ</DSQBox>
              <span className={styles.label}>Дисквалификация</span>
            </li>

            <li
              className={styles.item}
              onClick={() =>
                dispatch(
                  openPopupFormContainer({
                    formType: 'setPenalty',
                    formProps: {
                      profile,
                      seriesId,
                      stageResultId,
                      urlSlug,
                      stageOrder,
                      penalty,
                    },
                  })
                )
              }
            >
              <DSQBox>Pen</DSQBox>
              <span className={styles.label}>Установка штрафа</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default PopupMenuTableStageResult;
