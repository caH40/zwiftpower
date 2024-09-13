import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HelmetRiders } from '../../components/Helmets/HelmetRiders';
import useTitle from '../../hook/useTitle';
import { useAd } from '../../hook/useAd';
import { useResize } from '../../hook/use-resize';
import TableRiders from '../../components/Tables/TableRiders/TableRiders';
import { fetchRiders } from '../../redux/features/api/riders/fetchRiders';
import Pagination from '../../components/UI/Pagination/Pagination';
import FilterBoxForTable from '../../components/UI/FilterBoxForTable/FilterBoxForTable';
import { resetRiders } from '../../redux/features/api/riders/ridersSlice';
import AdContainer from '../../components/AdContainer/AdContainer';
import SkeletonTable from '../../components/SkeletonLoading/SkeletonTable/SkeletonTable';
import { initialSorting } from '../../redux/features/sortTableSlice';

import styles from './Riders.module.css';

// рекламные блоки на странице
const adOverFooter = 4;
const adUnderHeader = 17;
const adNumbers = [adUnderHeader, adOverFooter];

function Riders() {
  const [page, setPage] = useState(1);
  const initialDocsOnPage = localStorage.getItem('recordsOnPageRiders') || 20;
  const [docsOnPage, setDocsOnPage] = useState(initialDocsOnPage);
  const [search, setSearch] = useState('');
  const { isScreenLg: isDesktop } = useResize();
  const { activeSorting } = useSelector((state) => state.sortTable);

  useTitle('Участники заездов');
  const {
    riders,
    quantityPages,
    status: statusFetchRiders,
  } = useSelector((state) => state.riders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialSorting({ columnName: 'Финиш', isRasing: false }));

    return () => dispatch(resetRiders());
  }, []);

  useEffect(() => {
    localStorage.setItem('recordsOnPageRiders', docsOnPage);
    dispatch(fetchRiders({ page, docsOnPage, search, ...activeSorting }));
  }, [page, docsOnPage, search, activeSorting]);

  useAd(adNumbers);

  return (
    <>
      <HelmetRiders />
      <section className={styles.wrapper}>
        {isDesktop && <AdContainer number={adUnderHeader} height={180} marginBottom={10} />}

        <div className={styles.align__right}>
          <FilterBoxForTable
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
