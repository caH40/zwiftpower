import styles from './ListRiderSearch.module.css';

function ListRiderSearch({ riders, filteredRiders, getRiderData }) {
  const LiCurrent = (rider) => (
    <li className={styles.item} key={rider._id} onClick={() => getRiderData(rider.zwiftId)}>
      {`${rider.lastName} ${rider.firstName} (${rider.firstNameZwift} ${rider.lastNameZwift})`}
    </li>
  );
  return (
    <ul className={styles.list}>
      {riders.length ? filteredRiders.map((rider) => LiCurrent(rider)) : undefined}
      {filteredRiders.length > 14 ? (
        <li className={styles.itemMore}>
          ...еще {riders.length - filteredRiders.length} райдеров
        </li>
      ) : undefined}
    </ul>
  );
}

export default ListRiderSearch;
