import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import TableRiders from '../../components/Tables/TableRiders/TableRiders';
import Pagination from '../../components/UI/Pagination/Pagination';
import SkeletonTable from '../../components/SkeletonLoading/SkeletonTable/SkeletonTable';
import NavBarRidersTable from '../../components/UI/NavBarRidersTable/NavBarRidersTable';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import { RIDERS_LIST_HELMET_PROPS } from '../../assets/helmet-props';

import { fetchRiders } from '../../redux/features/api/riders/fetchRiders';
import { resetRiders } from '../../redux/features/api/riders/ridersSlice';
import { useInitialRidersSettings } from '../../hook/useInitialRidersSettings';
import { useLocalStorageSetRiders } from '../../hook/useLocalStorageSetRiders';
import { resetFilterCategory } from '../../redux/features/filterCategorySlice';
import { resetFilterGender } from '../../redux/features/filterGenderSlice';
import { lsPrefixRiders } from '../../constants/localstorage';
import { resetSortColumnTable } from '../../redux/features/sortTableSlice';

import styles from './Riders.module.css';

const localStorageFilterKey = `${lsPrefixRiders}filter`;
const localStoragePageSizeKey = `${lsPrefixRiders}pageSize`;

// Уникальный ключ для идентификации сортировки таблицы в данном компоненте.
const COMPONENT_ID = 'Riders';

/**
 * Страница с таблицей райдеров, принимавших участие в заездах на сайте.
 * Сортировка таблицы происходит на сервере из-за большого количества документов.
 */
function Riders() {
  const [page, setPage] = useState(1);

  const initialDocsOnPage = localStorage.getItem(localStoragePageSizeKey) || 20;
  const [docsOnPage, setDocsOnPage] = useState(initialDocsOnPage);

  const initialFilterTable = localStorage.getItem(localStorageFilterKey) || '';
  const [search, setSearch] = useState(initialFilterTable);

  const { activeSorting, componentId } = useSelector((state) => state.sortTable);
  const { name: category } = useSelector((state) => state.filterCategory.value);
  const { male } = useSelector((state) => state.filterGender.value);
  const isMounting = useRef(true);

  useTitle('Участники заездов');
  const {
    riders,
    quantityPages,
    status: statusFetchRiders,
  } = useSelector((state) => state.riders);

  const dispatch = useDispatch();

  // Инициализация данных из Локального хранилища.
  useInitialRidersSettings(COMPONENT_ID);

  // Сохранение данных в Локальном хранилище.
  useLocalStorageSetRiders({
    search,
    docsOnPage,
    activeSorting,
    category,
    isMounting,
    male,
  });

  // Очистка Хранилища после размонтировании компонента (страницы).
  useEffect(() => {
    return () => {
      dispatch(resetRiders());
      dispatch(resetFilterCategory());
      dispatch(resetFilterGender());
      dispatch(resetSortColumnTable());
    };
  }, [dispatch]);

  // Получение данных с БД.
  useEffect(() => {
    // При монтировании не все данные для fetch запроса установленны.
    if (isMounting.current) {
      isMounting.current = false;
      return;
    }

    // Если сортировка не для COMPONENT_ID, то выход.
    if (componentId !== COMPONENT_ID) {
      return;
    }

    dispatch(fetchRiders({ page, docsOnPage, search, ...activeSorting, category, male }));
  }, [page, docsOnPage, search, activeSorting, category, male, dispatch, componentId]);

  return (
    <>
      <HelmetComponent {...RIDERS_LIST_HELMET_PROPS} />
      <section className={styles.wrapper}>
        <div className={styles.align__right}>
          <NavBarRidersTable
            search={search}
            setSearch={setSearch}
            docsOnPage={docsOnPage}
            setDocsOnPage={setDocsOnPage}
            placeholder={'поиск'}
            setPage={setPage}
            showClearButton={true}
          />
        </div>
        {/* Скелетон загрузки для Таблицы */}
        <SkeletonTable status={statusFetchRiders} rows={+docsOnPage} height={40} />

        {riders[0] && statusFetchRiders === 'resolved' && (
          <div className={styles.wrapper}>
            <div className={styles.align__right}></div>

            <section className={styles.wrapper__wide}>
              <TableRiders riders={riders} />
            </section>
            {quantityPages > 1 && (
              <Pagination quantityPages={quantityPages} page={page} setPage={setPage} />
            )}
          </div>
        )}
      </section>
    </>
  );
}

export default Riders;
