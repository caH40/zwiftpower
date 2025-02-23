import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import { useSeriesTableListActions } from '../../../hook/useSeriesTableListActions';
import { getTimerLocal } from '../../../utils/date-local';
import TdImage from '../Td/TdImage/TdImage';
import IconEdit from '../../icons/IconEdit';
import IconDelete from '../../icons/IconDelete';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

/**
 * Таблица со списком серий, созданных организатором.
 */
function TableSeriesOrganizer({ series, organizerId }) {
  // Обработчики нажатий кнопок.
  const { editSeries, deleteSeries } = useSeriesTableListActions({ organizerId });

  return (
    <table className={cx('table')}>
      <caption className={styles.caption}>Серии заездов</caption>
      <Thead />
      <tbody>
        {series.map((elm, index) => {
          return (
            <tr className={styles.hover} key={elm._id}>
              <td>{index + 1}</td>
              <td>
                <TdImage url={elm.posterUrls?.small} width={100} height={65} />
              </td>
              <td>
                <TdImage url={elm.logoUrls?.original} width={60} height={60} />
              </td>
              <td>{elm.name}</td>
              <td>{getTimerLocal(elm.dateStart, 'DDMMYY')}</td>
              <td>{getTimerLocal(elm.dateEnd, 'DDMMYY')}</td>
              <td>{elm.type}</td>
              <td>{elm.isFinished ? 'Да' : 'Нет'}</td>
              <td>
                <Link className={styles.link} to={`/series/${elm.urlSlug}`}>
                  page
                </Link>
              </td>
              <td>
                <IconEdit
                  tooltip={'Редактирование серии'}
                  getClick={() => editSeries(elm._id)}
                  squareSize={20}
                />
              </td>

              <td>
                <div className={cx('centerBlock')}>
                  <IconDelete
                    tooltip="Удаление Серии"
                    getClick={() => deleteSeries(elm._id, elm.name)}
                    squareSize={20}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableSeriesOrganizer;
