import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classnames from 'classnames/bind';

import { getAlert } from '../../../redux/features/alertMessageSlice';
import { getTimerLocal } from '../../../utils/date-local';
import { fetchDeleteSeriesOrganizer } from '../../../redux/features/api/series/fetchSeries';
import TdImage from '../Td/TdImage/TdImage';
import IconEdit from '../../icons/IconEdit';
import IconDelete from '../../icons/IconDelete';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

/**
 * Таблица со списком серий, созданных организатором.
 */
function TableSeriesOrganizer({ series }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Обработчик нажатия на иконку редактирования Серии.
  const editSeries = (seriesId) => {
    navigate(`/organizer/series/edit/${seriesId}`);
  };

  // Обработчик нажатия на иконку удаления Серии.
  const deleteSeries = async (seriesId, name) => {
    const confirmed = window.confirm(
      `Вы действительно хотите удалить Серию заездов с названием "${name}". Будут удалены все данные связанные с этой серии, кроме Этапов и результатов этих этапов.`
    );

    if (!confirmed) {
      dispatch(
        getAlert({ message: 'Отмена удаления серии!', type: 'warning', isOpened: true })
      );
      return;
    }

    try {
      const res = await dispatch(fetchDeleteSeriesOrganizer({ seriesId })).unwrap();

      dispatch(
        getAlert({
          message: res.data.message || 'Неизвестная ошибка на сервере!',
          type: 'success',
          isOpened: true,
        })
      );
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };
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
