import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchGetStageResults } from '../../../redux/features/api/series/fetchSeries';
import { getCategoriesSortedDry } from '../../UI/Filters/FilterCategory/categoriesSort';
import { resetStageResults } from '../../../redux/features/api/series/seriesPublicSlice';
import TableStageResults from '../../Tables/TableStageResults/TableStageResults';
import NavBarResultsRaceTable from '../../UI/NavBarResultsRaceTable/NavBarResultsRaceTable';
import ServiceBox from '../../ServiceBox/ServiceBox';
import Button from '../../UI/Button/Button';
import { useUserRole } from '../../../hook/useUserRole';
import { openPopupFormContainer } from '../../../redux/features/popupFormContainerSlice';

import styles from './StageResults.module.css';

/**
 * Страница с результатами этапа Серии заездов.
 */
export default function StageResults() {
  const { urlSlug, stageOrder } = useParams();
  const { isAdmin } = useUserRole();
  const { stageResults, seriesPublicOne } = useSelector((state) => state.seriesPublic);
  const { organizer } = useSelector((state) => state.checkAuth.value.user);
  const filterCategory = useSelector((state) => state.filterCategory.value);
  const currentCategory = filterCategory.isActive ? filterCategory.name : null;

  // Включено или нет правило общего времени группы в заданном временном разрыве на финише.
  // const timeGapThresholdEnabled = Boolean(seriesPublicOne.timeGapThresholdSeconds);

  // Отображается иконка управления серией только для организатора который создал серию.
  const isSeriesCreator =
    seriesPublicOne?.organizer?._id && seriesPublicOne?.organizer?._id === organizer;

  // Может быть несколько этапов с одинаковым номером (order), но разными eventStart.
  // Необходимо выбирать наименьший eventStart и stageName в этапах с одним номером (order).
  const stageData = useMemo(() => {
    if (!seriesPublicOne) {
      return null;
    }

    return [...seriesPublicOne.stages]
      .sort((a, b) => new Date(a.eventStart) - new Date(b.eventStart))
      .find((stage) => stage.order === +stageOrder);
  }, [seriesPublicOne, stageOrder]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetStageResults({ urlSlug, stageOrder }));

    return () => dispatch(resetStageResults());
  }, [urlSlug, stageOrder, dispatch]);

  const hiddenColumns =
    seriesPublicOne?.type === 'endurance'
      ? ['Место', 'Отставание от райдера впереди', 'Отставание от лидера']
      : [];

  return (
    <section className={styles.wrapper}>
      {stageResults?.results && stageData && (
        <>
          <nav className={styles.block__nav}>
            {/* Фильтры данных в таблице */}
            <NavBarResultsRaceTable
              results={stageResults.results}
              hideDocsOnPage={true}
              hideFilterColumn={true}
              categoriesButton={getCategoriesSortedDry({
                results: stageResults.results,
                needAbsolute: true,
                getCategory: (r) => r.category,
              })}
            />
          </nav>

          <section className={styles.wrapper__wide}>
            <TableStageResults
              results={stageResults.results}
              stageOrder={stageOrder}
              stageName={stageData.name}
              stageStart={stageData.eventStart}
              isSeriesCreator={isSeriesCreator}
              isAdmin={isAdmin}
              urlSlug={urlSlug}
              hiddenColumns={hiddenColumns}
              finishTimeLimitOnStage={seriesPublicOne?.finishTimeLimitOnStage}
            />

            <ServiceBox updated={stageResults.resultsUpdatedAt} />

            {/* Кнопка добавления результата в этап. Не отображается если выбраны абсолют по группам */}
            {currentCategory !== 'All' && (isSeriesCreator || isAdmin) ? (
              <div className={styles.btnContainer}>
                <Button
                  getClick={() =>
                    dispatch(
                      openPopupFormContainer({
                        formType: 'addResult', // мапинг в компоненте PopupFormContainer
                        formProps: {
                          category: currentCategory,
                          seriesId: seriesPublicOne?._id,
                          urlSlug,
                          stageOrder,
                        },
                      })
                    )
                  }
                >
                  Добавить результат
                </Button>
              </div>
            ) : null}
          </section>
        </>
      )}
    </section>
  );
}
