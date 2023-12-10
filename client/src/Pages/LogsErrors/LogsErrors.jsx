import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { CheckBoxTotal } from '../../components/UI/CheckBoxForArray/CheckboxTotal';
import BoxAction from '../../components/UI/BoxAction/BoxAction';
import useTitle from '../../hook/useTitle';
import TableLogsErrors from '../../components/Tables/TableLogsErrors/TableLogsErrors';
import { fetchLogsErrors, resetLogsErrors } from '../../redux/features/api/logsErrorsSlice';
import Pagination from '../../components/UI/Pagination/Pagination';
import FilterBoxForTable from '../../components/UI/FilterBoxForTable/FilterBoxForTable';
import IconTrash from '../../components/icons/IconTrash';

import styles from './LogsErrors.module.css';

const cx = classNames.bind(styles);

function LogsErrors() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [arrayId, setArrayId] = useState([]);
  const [checkedTotal, setCheckedTotal] = useState(false);

  const initialDocsOnPage = localStorage.getItem('recordsOnPageLogs') || 20;
  const [docsOnPage, setDocsOnPage] = useState(initialDocsOnPage);
  useTitle('Логи ошибок на сервере');
  const { logs, quantityPages } = useSelector((state) => state.logsErrors);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('recordsOnPageLogs', docsOnPage);
    dispatch(fetchLogsErrors({ page, docsOnPage, search }));
  }, [dispatch, page, docsOnPage, search]);

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
