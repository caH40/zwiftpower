import classnames from 'classnames/bind';

import IconDelete from '../../icons/IconDelete';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableClubs({ clubs }) {
  const deleteClub = (clubId) => {
    console.log(`Удаление клуба ${clubId}`);
  };

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
            <td>{club.images.icon}</td>
            <td>
              <IconDelete tooltip="Удаление клуба" getClick={() => deleteClub(club.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableClubs;
