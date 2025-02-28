import classnames from 'classnames/bind';

import { getTimerLocal } from '../../../utils/date-local';
import IconEdit from '../../icons/IconEdit';
import IconDelete from '../../icons/IconDelete';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

/**
 * Таблица со списком конфигураций финишных протоколов.
 */
export default function TableConfigsFP({ configsFP, editConfigFP, deleteConfigFP }) {
  return (
    <table className={cx('table')}>
      <caption className={styles.caption}>Конфигурации финишных протоколов</caption>
      <Thead />
      <tbody>
        {configsFP.map((elm, index) => {
          return (
            <tr className={styles.hover} key={elm._id}>
              <td>{index + 1}</td>
              <td>{elm.name}</td>
              <td>{elm.displayName}</td>
              <td>{elm.description}</td>
              <td>{elm.organizerName}</td>
              <td>{getTimerLocal(elm.createdAt, 'DDMMYY')}</td>
              <td>{getTimerLocal(elm.updatedAt, 'DDMMYY')}</td>

              <td>
                <IconEdit
                  tooltip={'Редактирование'}
                  getClick={() => editConfigFP(elm._id)}
                  squareSize={20}
                />
              </td>

              <td>
                <div className={cx('centerBlock')}>
                  <IconDelete
                    tooltip="Удаление"
                    getClick={() => deleteConfigFP(elm._id, elm.name)}
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
