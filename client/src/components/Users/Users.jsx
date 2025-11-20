import styles from './Users.module.css';
/**
 * @typedef {Object} TUserWithFLLZ
 * @property {number|null} zwiftId
 * @property {string|null} firstName
 * @property {string|null} lastName
 * @property {string|null} imageSrc
 */

/**
 * Блок отображающий иконки пользователей.
 * @param {object} props - Пропсы.
 * @param {number} [props.quantity] - Количество отображаемых иконок пользователей.
 * @param {TUserWithFLLZ[]} props.users - Количество отображаемых иконок пользователей.
 *
 */
export default function Users({ users, quantity = 10 }) {
  const validUsers = users.filter((u) => u.zwiftId !== null);
  const currentUser = validUsers.slice(0, quantity);
  const hasMoreUsers = validUsers.length > quantity;
  const remainingCount = validUsers.length - quantity;

  return (
    <div className={styles.wrapper}>
      {currentUser.map((u, index) => {
        if (u.imageSrc) {
          return (
            <img
              key={u.zwiftId}
              src={u.imageSrc}
              className={styles.img}
              alt={'user logo'}
              width={26}
              height={26}
              style={{ zIndex: currentUser.length - index }}
            />
          );
        } else {
          return (
            <div
              key={u.zwiftId}
              className={styles.empty}
              style={{ zIndex: currentUser.length - index }}
            >
              {u.firstName ? u.firstName.slice(0, 1) : '?'}
            </div>
          );
        }
      })}

      {hasMoreUsers && (
        <div className={styles.dots} style={{ zIndex: 0 }}>
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
