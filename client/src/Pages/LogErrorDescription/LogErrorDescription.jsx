import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchLogError, resetLogError } from '../../redux/features/api/logErrorSlice';
import useTitle from '../../hook/useTitle';
import { getTimerLocal } from '../../utils/date-local';
import JSONBlock from '../../components/JSONBlock/JSONBlock';
import BackButton from '../../components/UI/BackButton/BackButton';

import styles from './LogErrorDescription.module.css';

/**
 * Страница подобной информации об запрашиваемой ошибке на сервере
 */
function LogErrorDescription() {
  useTitle('Информация об ошибке');
  const { id } = useParams();
  const { log } = useSelector((state) => state.logError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLogError(id));
    return () => {
      dispatch(resetLogError());
    };
  }, [id]);

  return (
    <>
      {log && (
        <section>
          <dl className={styles.list}>
            <dt>Дата и время</dt>
            <dd className={styles.group}>{getTimerLocal(log.timestamp, 'DDMMYYHms')}</dd>
            {log.type && (
              <>
                <dt>Тип</dt>
                <dd className={styles.group}>{log.type}</dd>
              </>
            )}

            {log.message && (
              <>
                <dt>Краткое описание</dt>
                <dd className={styles.group}>{log.message}</dd>
              </>
            )}

            {log.responseData && (
              <>
                <dt>Ответ стороннего API</dt>
                <dd className={styles.group}>{log.responseData}</dd>
              </>
            )}

            {log.stack && (
              <>
                <dt>Стэк</dt>
                <dd className={styles.group}>
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: log.stack,
                    }}
                  />
                </dd>
              </>
            )}

            {log.config && (
              <>
                <dt>Config</dt>
                <dd>
                  <JSONBlock json={log.config} />
                </dd>
              </>
            )}

            {log.config?.data && (
              <>
                <dt>Data from Axios config</dt>
                <dd>
                  <JSONBlock json={JSON.parse(log.config.data)} />
                </dd>
              </>
            )}
          </dl>
          <div className={styles.right}>
            <BackButton to={'/admin/logs/errors'} />
          </div>
        </section>
      )}
    </>
  );
}

export default LogErrorDescription;
