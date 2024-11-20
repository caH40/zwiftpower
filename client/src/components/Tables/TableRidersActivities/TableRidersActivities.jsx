import { useDispatch } from 'react-redux';
import classnames from 'classnames/bind';

import { getTimerLocal } from '../../../utils/date-local';
import CheckboxSimple from '../../UI/Checkbox/CheckboxSimple';
import {
  fetchGetFitfiles,
  fetchPutBannedFitfiles,
} from '../../../redux/features/api/fitfiles/fetchFitfiles';
import { getAlert } from '../../../redux/features/alertMessageSlice';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableRidersActivities({ activities, zwiftId }) {
  const dispatch = useDispatch();

  // Обработчик нажатия checkbox для блокировки/разблокировки активности.
  const handlerCheckboxBaned = (e) => {
    const _idActivity = e.target.name;
    const banned = e.target.checked;
    dispatch(fetchPutBannedFitfiles({ _idActivity, banned })).then((res) => {
      // Запрос обновленных данных активностей.
      dispatch(fetchGetFitfiles({ zwiftId }));

      if (!res.error) {
        dispatch(getAlert({ message: res.payload.message, type: 'success', isOpened: true }));
      }
    });
  };

  return (
    <table className={cx('table')}>
      <caption className={styles.caption}>Активности с фитфайлами</caption>
      <Thead />
      <tbody>
        {activities.map((activity, index) => (
          <tr className={styles.hover} key={activity._id}>
            <td>{index + 1}</td>
            <td>{getTimerLocal(activity.date, 'DDMMYYHms')}</td>
            <td>{activity.name}</td>
            <td>{activity.weightInGrams / 1000}кг</td>
            <td>{activity._id}</td>
            <td>
              <CheckboxSimple
                name={activity._id}
                checked={activity.banned === true ? true : false}
                handleCheckboxChange={handlerCheckboxBaned}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableRidersActivities;
