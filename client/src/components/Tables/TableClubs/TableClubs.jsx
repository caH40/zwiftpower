import classnames from 'classnames/bind';

import IconDelete from '../../icons/IconDelete';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableClubs({ clubs, deleteClub }) {
  return (
    <table className={cx('table')}>
      <caption className={styles.caption}>
        Список клубов из Звифт, которые создают заезды
      </caption>
      <Thead />
      <tbody>
        {clubs.map((club) => (
          <tr className={styles.hover} key={club.id}>
            <td>{club.name}</td>
            <td>{club.tagline}</td>
            <td>{club.description}</td>
            <td>{club.id}</td>
            <td>
              <div className={styles.box__image}>
                <img
                  className={styles.image}
                  src={club.images.icon}
                  alt={`${club.name} club icon`}
                />
              </div>
            </td>
            <td>
              <IconDelete
                tooltip="Удаление клуба"
                getClick={() => deleteClub(club.id, club.name)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableClubs;
