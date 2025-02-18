import classnames from 'classnames/bind';

import IconDelete from '../../icons/IconDelete';
import IconAdd from '../../icons/IconAdd';
import IconRefresh from '../../icons/IconRefresh';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

/**
 * Таблица с добавленными клубами Организаторами заездов. Добавление/удаление модераторов в клуб.
 */
function TableClubs({ clubs, deleteClub, addModerator, deleteModerator, updateClub }) {
  return (
    <table className={cx('table')}>
      <caption className={styles.caption}>
        Список клубов из Звифт, которые создают заезды
      </caption>
      <Thead />
      <tbody>
        {clubs.map((club) => {
          // компонент: имя модератора и иконка исключения из модераторов
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

              {/* Иконка клуба */}
              <td>
                <div className={styles.box__image}>
                  <img
                    className={styles.image}
                    src={club.images.icon}
                    alt={`${club.name} club icon`}
                  />
                </div>
              </td>

              {/* Название организатора */}
              <td>{club.organizer?.name}</td>

              <td>
                <div>{club.moderators?.length ? moderators : null}</div>
              </td>

              <td>
                <IconAdd
                  tooltip={'Добавление модератора'}
                  getClick={() => addModerator(club.id, club.name)}
                  squareSize={14}
                />
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

              <td>
                <div className={cx('centerBlock')}>
                  <IconRefresh
                    tooltip="Обновление данных клуба"
                    getClick={() => updateClub(club.id)}
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
