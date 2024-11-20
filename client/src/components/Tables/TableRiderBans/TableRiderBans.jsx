import { useDispatch } from 'react-redux';
import classnames from 'classnames/bind';

import { getTimerLocal } from '../../../utils/date-local';
import CheckboxSimple from '../../UI/Checkbox/CheckboxSimple';
import { fetchGetFitfiles } from '../../../redux/features/api/fitfiles/fetchFitfiles';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import { bansForRider } from '../../../assets/ban';
import {
  fetchGetRiderBan,
  fetchPutRiderBan,
} from '../../../redux/features/api/rider-ban/fetchRiderBan';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableRiderBans({ bans, zwiftId }) {
  const dispatch = useDispatch();

  // Обработчик нажатия checkbox для блокировки/разблокировки активности.
  const handlerCheckboxBaned = (e) => {
    const code = e.target.name;
    const banned = e.target.checked;

    dispatch(fetchPutRiderBan({ zwiftId, banned, code })).then((res) => {
      // Запрос обновленных данных активностей.
      dispatch(fetchGetRiderBan({ zwiftId }));
      if (!res.error) {
        dispatch(getAlert({ message: res.payload.message, type: 'success', isOpened: true }));
      }
    });
  };

  return (
    <table className={cx('table')}>
      <caption className={styles.caption}>Банны у райдера</caption>
      <Thead />
      <tbody>
        {bansForRider.map((banForRider, index) => {
          const current = bans.find((ban) => ban.bannedReason.code === banForRider.code);

          return (
            <tr className={styles.hover} key={banForRider.code}>
              <td>{index + 1}</td>
              <td>{current ? getTimerLocal(current.updatedAt, 'DDMMYYHms') : null}</td>
              <td>{banForRider.code}</td>
              <td>{banForRider.description}</td>
              <td>{current ? current.adminId : null}</td>
              <td>
                <CheckboxSimple
                  name={banForRider.code}
                  checked={current ? true : false} // Если current существует, значит этот бан активный.
                  handleCheckboxChange={handlerCheckboxBaned}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableRiderBans;
