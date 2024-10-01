import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import TableRiders from '../../components/Tables/TableRiders/TableRiders';
import Pagination from '../../components/UI/Pagination/Pagination';
import AdContainer from '../../components/AdContainer/AdContainer';
import SkeletonTable from '../../components/SkeletonLoading/SkeletonTable/SkeletonTable';
import NavBarRidersTable from '../../components/UI/NavBarRidersTable/NavBarRidersTable';
import { HelmetRiders } from '../../components/Helmets/HelmetRiders';
import { useAd } from '../../hook/useAd';
import { useResize } from '../../hook/use-resize';
import { fetchRiders } from '../../redux/features/api/riders/fetchRiders';
import { resetRiders } from '../../redux/features/api/riders/ridersSlice';
import { useInitialRidersSettings } from '../../hook/useInitialRidersSettings';
import { useLocalStorageSetRiders } from '../../hook/useLocalStorageSetRiders';
import { resetFilterCategory } from '../../redux/features/filterCategorySlice';

import styles from './Riders.module.css';

// рекламные блоки на странице
const adOverFooter = 4;
const adUnderHeader = 17;
const adNumbers = [adUnderHeader, adOverFooter];

/**
 * Страница с таблицей райдеров, принимавших участие в заездах на сайте.
 * Сортировка таблицы происходит на сервере из-за большого количества документов.
 */
function Riders() {
  const [page, setPage] = useState(1);
  const initialDocsOnPage = localStorage.getItem('recordsOnPageRiders') || 20;
  const [docsOnPage, setDocsOnPage] = useState(initialDocsOnPage);
  const [search, setSearch] = useState('');
  const { isScreenLg: isDesktop } = useResize();
  const { activeSorting } = useSelector((state) => state.sortTable);
  const { name: category } = useSelector((state) => state.filterCategory.value);
  const isMounting = useRef(true);

  useTitle('Участники заездов');
  const {
    riders,
    quantityPages,
    status: statusFetchRiders,
  } = useSelector((state) => state.riders);

  const dispatch = useDispatch();

  // Инициализация данных из Локального хранилища.
  useInitialRidersSettings();

  // Сохранение данных в Локальном хранилище.
  useLocalStorageSetRiders({
    docsOnPage,
    activeSorting,
    category,
    isMounting,
  });

  // Очистка Хранилища после размонтировании компонента (страницы).
  useEffect(() => {
    return () => {
      dispatch(resetRiders());
      dispatch(resetFilterCategory());
    };
  }, []);

  // Получение данных с БД.
  useEffect(() => {
    // При монтировании не все данные для fetch запроса установленны.
    if (isMounting.current) {
      isMounting.current = false;
      return;
    }

    dispatch(fetchRiders({ page, docsOnPage, search, ...activeSorting, category }));
  }, [page, docsOnPage, search, activeSorting, category]);

  useAd(adNumbers);

  return (
    <>
      <HelmetRiders />
      <section className={styles.wrapper}>
        {isDesktop && <AdContainer number={adUnderHeader} height={180} marginBottom={10} />}

        <div className={styles.align__right}>
          <NavBarRidersTable
            search={search}
            setSearch={setSearch}
            docsOnPage={docsOnPage}
            setDocsOnPage={setDocsOnPage}
            placeholder={'поиск'}
            setPage={setPage}
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

      <AdContainer number={isDesktop ? adOverFooter : adUnderHeader} maxWidth={1105} />
    </>
  );
}

export default Riders;
