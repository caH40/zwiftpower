import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import NavBarSignedRiders from '../../components/UI/NavBarSignedRiders/NavBarSignedRiders';
import TableRiders from '../../components/Tables/TableRiders/TableRiders';
import { fetchRiders } from '../../redux/features/api/riders/fetchRiders';
import Pagination from '../../components/UI/Pagination/Pagination';
import FilterBoxForTable from '../../components/UI/FilterBoxForTable/FilterBoxForTable';
import { resetRiders } from '../../redux/features/api/riders/ridersSlice';

import styles from './Riders.module.css';

function Riders() {
  const [page, setPage] = useState(1);
  const initialDocsOnPage = localStorage.getItem('recordsOnPageRiders') || 20;
  const [docsOnPage, setDocsOnPage] = useState(initialDocsOnPage);
  const [search, setSearch] = useState('');
  useTitle('Участники заездов');
  const { riders, quantityPages } = useSelector((state) => state.riders);

  const dispatch = useDispatch();
  useEffect(() => {
    return () => dispatch(resetRiders());
  }, []);

  useEffect(() => {
    localStorage.setItem('recordsOnPageRiders', docsOnPage);
    dispatch(fetchRiders({ page, docsOnPage, search }));
  }, [page, docsOnPage, search]);

  return (
    <>
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
      {riders[0] && (
        <div className={styles.wrapper}>
          <div className={styles.align__right}></div>
          {/* <NavBarSignedRiders /> */}
          <section className={styles.wrapper__wide}>
            <TableRiders riders={riders} />
          </section>
          {quantityPages > 1 && (
            <Pagination quantityPages={quantityPages} page={page} setPage={setPage} />
          )}
        </div>
      )}
    </>
  );
}

export default Riders;
