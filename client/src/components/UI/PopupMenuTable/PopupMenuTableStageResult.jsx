import { useDispatch } from 'react-redux';

import { openPopupFormContainer } from '../../../redux/features/popupFormContainerSlice';

import styles from './PopupMenuTable.module.css';

/**
 * popup меню для взаимодействия с выбранным Эвентом на странице Расписания Эвентов
 */
function PopupMenuTableStageResult({
  showMenu,
  setShowMenu,
  category,
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
                    formType: 'setCategory',
                    formProps: {
                      category,
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
              <span className={styles.label}>Изменение категории</span>
            </li>

            <li
              className={styles.item}
              onClick={() =>
                dispatch(openPopupFormContainer({ formType: 'setDisqualification' }))
              }
            >
              <span className={styles.label}>Дисквалификация</span>
            </li>

            <li
              className={styles.item}
              onClick={() => dispatch(openPopupFormContainer({ formType: 'setPenalty' }))}
            >
              <span className={styles.label}>Установка штрафа</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default PopupMenuTableStageResult;
