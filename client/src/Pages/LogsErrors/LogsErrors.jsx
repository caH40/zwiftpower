import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CheckBoxTotal } from '../../components/UI/CheckBoxForArray/CheckboxTotal';
import BoxAction from '../../components/UI/BoxAction/BoxAction';
import useTitle from '../../hook/useTitle';
import TableLogsErrors from '../../components/Tables/TableLogsErrors/TableLogsErrors';
import { fetchLogsErrors, resetLogsErrors } from '../../redux/features/api/logsErrorsSlice';
import Pagination from '../../components/UI/Pagination/Pagination';
import FilterBoxForTable from '../../components/UI/FilterBoxForTable/FilterBoxForTable';
import IconTrash from '../../components/icons/IconTrash';
import { fetchLogDeleteError } from '../../redux/features/api/logErrorDeleteSlice';
import { useLastPage } from '../../hook/useLastPage';

import styles from './LogsErrors.module.css';

function LogsErrors() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [arrayId, setArrayId] = useState([]);
  const [checkedTotal, setCheckedTotal] = useState(false);

  const initialDocsOnPage = localStorage.getItem('recordsOnPageLogs') || 20;
  const [docsOnPage, setDocsOnPage] = useState(initialDocsOnPage);
  useTitle('Логи ошибок на сервере');
  const {
    logs,
    page: pageFromServer,
    quantityPages,
  } = useSelector((state) => state.logsErrors);
  const { trigger } = useSelector((state) => state.logErrorDelete);
  const dispatch = useDispatch();

  useLastPage(setPage, quantityPages, pageFromServer, page);

  useEffect(() => {
    // не делать запрос на API так как необходимо только поменять номер
    // активной страницы в пагинации
    if (quantityPages < page && quantityPages !== 0) {
      return;
    }
    localStorage.setItem('recordsOnPageLogs', docsOnPage);
    dispatch(fetchLogsErrors({ page, docsOnPage, search }));
    setArrayId([]);
  }, [dispatch, page, docsOnPage, search, trigger]);

  // очистка setCheckedTotal и массива logs errors
  useEffect(() => {
    setCheckedTotal(false);
    setArrayId([]);
  }, [logs]);

  useEffect(() => {
    return () => {
      dispatch(resetLogsErrors());
    };
  }, []);

  const deleteLogError = () => {
    // если нет логов для удаления, то не выполнять функцию
    if (!arrayId[0]) {
      return;
    }
    dispatch(fetchLogDeleteError(arrayId));
  };

  const ids = logs?.map((log) => log._id);
  return (
    <section className={styles.wrapper}>
      <div className={styles.direction}>
        <div className={styles.direction__checkbox}>
          <CheckBoxTotal
            checked={checkedTotal}
            setChecked={setCheckedTotal}
            arrayId={arrayId}
            setArrayId={setArrayId}
            ids={ids}
          />
          <BoxAction Icon={IconTrash} getClick={deleteLogError} isActive={arrayId[0]}>
            Удалить
          </BoxAction>
        </div>

        <FilterBoxForTable
          search={search}
          setSearch={setSearch}
          docsOnPage={docsOnPage}
          setDocsOnPage={setDocsOnPage}
          placeholder={'поиск'}
          setPage={setPage}
        />
      </div>
      {logs[0] && (
        <>
          <TableLogsErrors
            checkedTotal={checkedTotal}
            arrayId={arrayId}
            setArrayId={setArrayId}
            logs={logs}
          />
          <Pagination quantityPages={quantityPages} page={page} setPage={setPage} />
        </>
      )}
    </section>
  );
}

export default LogsErrors;
