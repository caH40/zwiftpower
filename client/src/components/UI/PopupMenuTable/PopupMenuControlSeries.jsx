import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import IconRefresh from '../../icons/IconRefresh';
import IconModify from '../../icons/IconModify';

import styles from './PopupMenuTable.module.css';

/**
 * Попап меню для управления Серией заездов.
 * Обновление итоговых таблиц.
 * Обновление/создание результатов этапов серии.
 */
function PopupMenuControlSeries({
  seriesId,
  stages,
  updateStageResults,
  updateGeneralClassification,
  setIsVisibleMenuControl,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Обработчик нажатия на кнопку обновления результатов этапа серии.
  const handleBtnUpdateStageResults = (e, seriesId, stageOrder) => {
    e.stopPropagation();
    setIsVisibleMenuControl(false);
    updateStageResults({
      seriesId,
      stageOrder,
    });
  };

  // Обработчик нажатия на кнопку обновления ГС.
  const handleBtnUpdateGC = (e, seriesId) => {
    e.stopPropagation();
    setIsVisibleMenuControl(false);
    updateGeneralClassification({
      seriesId,
    });
  };

  return (
    <div className={styles.popup} onMouseLeave={() => setIsVisibleMenuControl(false)}>
      <ul className={styles.list}>
        <li
          className={styles.item}
          onClick={() => navigate(`/organizer/series/edit/${seriesId}`)}
        >
          <IconModify squareSize={20} bgColor={'orange'} />
          <span className={styles.label}>Редактирование серии</span>
        </li>

        <li className={styles.item} onClick={(e) => handleBtnUpdateGC(e, seriesId)}>
          <IconRefresh squareSize={20} bgColor={'orange'} />
          <span className={styles.label}>Обновить ГС</span>
        </li>

        {stages.map(({ stageOrder }) => (
          <li
            className={styles.item}
            onClick={(e) => handleBtnUpdateStageResults(e, seriesId, stageOrder)}
            key={stageOrder}
          >
            <IconRefresh squareSize={20} />
            <span className={styles.label}>Обновить этап №{stageOrder}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopupMenuControlSeries;
