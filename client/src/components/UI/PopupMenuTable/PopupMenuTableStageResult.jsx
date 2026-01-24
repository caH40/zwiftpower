import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { openPopupFormContainer } from '../../../redux/features/popupFormContainerSlice';
import { useDeleteAddStageResult } from '../../../hook/useDeleteAddStageResult';
import IconCategory from '../../icons/IconCategory';
import DSQBox from '../../DSQBox/DSQBox';
import IconDelete from '../../icons/IconDelete';

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
  timePenalty,
  profile,
  seriesId,
  stageResultId,
  urlSlug,
  stageOrder,
  addedByModerator,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const deleteStageResult = useDeleteAddStageResult({ urlSlug, stageOrder, setIsLoading });

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
                dispatch(
                  openPopupFormContainer({
                    formType: 'setDisqualification',
                    formProps: {
                      stageResultId,
                      urlSlug,
                      profile,
                      stageOrder,
                      disqualification,
                    },
                  })
                )
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
                      timePenalty,
                    },
                  })
                )
              }
            >
              <DSQBox>Pen</DSQBox>
              <span className={styles.label}>Установка штрафа</span>
            </li>

            {/* Удаление результата возможно только результата, добавленного модератором */}
            {addedByModerator ? (
              <li className={styles.item} onClick={() => deleteStageResult(stageResultId)}>
                <IconDelete />
                <span className={styles.label}>Удаление результата</span>
              </li>
            ) : null}
          </ul>
        </div>
      )}
    </>
  );
}

export default PopupMenuTableStageResult;
