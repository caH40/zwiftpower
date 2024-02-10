import classnames from 'classnames/bind';

import IconDelete from '../../icons/IconDelete';
import IconAdd from '../../icons/IconAdd';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableClubs({ clubs, deleteClub, addModerator, deleteModerator }) {
  return (
    <table className={cx('table')}>
      <caption className={styles.caption}>
        Список клубов из Звифт, которые создают заезды
      </caption>
      <Thead />
      <tbody>
        {clubs.map((club) => {
          const moderators = club?.moderators?.map((moderator) => (
            <div className={cx('box__moderators')} key={moderator._id}>
              <span>{moderator.username}</span>
              <IconDelete
                tooltip={`Исключение ${moderator.username} из модераторов клуба`}
                squareSize={14}
                getClick={() => deleteModerator(club.id, moderator._id)}
              />
            </div>
          ));
          return (
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
              <td>{club.organizer?.name}</td>
              <td>
                <div className={cx('block__moderators')}>
                  <div>{club.moderators?.length ? moderators : null}</div>
                  <IconAdd
                    tooltip={'Добавление модератора'}
                    getClick={() => addModerator(club.id, club.name)}
                    squareSize={20}
                  />
                </div>
              </td>
              <td>
                <div className={cx('centerBlock')}>
                  <IconDelete
                    tooltip="Удаление клуба"
                    getClick={() => deleteClub(club.id, club.name)}
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

export default TableClubs;
