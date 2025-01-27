import classnames from 'classnames/bind';

import IconDelete from '../../icons/IconDelete';
import IconAdd from '../../icons/IconAdd';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableOrganizer({ organizers = [], deleteOrganizer }) {
  return (
    <table className={cx('table')}>
      <caption className={styles.caption}>Список организаторов заездов</caption>
      <Thead />
      <tbody>
        {organizers.map((organizer, index) => (
          <tr className={styles.hover} key={organizer._id}>
            <td>{index + 1}</td>
            <td>{organizer.name}</td>
            <td>{organizer.shortName}</td>
            <td>{organizer.creator?.username || 'Ошибка, нет creator!'}</td>

            <td>
              <div className={cx('centerBlock')}>
                <IconDelete
                  tooltip="Удаление клуба"
                  getClick={() => deleteOrganizer(organizer._id, organizer.name)}
                  squareSize={20}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableOrganizer;
