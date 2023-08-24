import { useEffect, useState } from 'react';

import { getRider, getRiders } from '../../../api/riders';
import SimpleInput from '../SimpleInput/SimpleInput';

import styles from './BoxRider.module.css';

function BoxRider({ setRider, setIsVisibleModal }) {
  const [state, setState] = useState({ fio: '' });
  const [riders, setRiders] = useState([]);
  const [filteredRiders, setFilteredRiders] = useState([]);

  useEffect(() => {
    getRiders().then((response) => setRiders(response.data.riders));
  }, []);

  useEffect(() => {
    setFilteredRiders(
      [...riders]
        .filter((rider) =>
          (rider.firstName.toLowerCase() + ' ' + rider.lastName.toLowerCase()).includes(
            state.fio.toLowerCase()
          )
        )
        .sort((a, b) => a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase()))
        .slice(0, 15)
    );
  }, [state, riders]);

  const getRiderData = (riderId) =>
    getRider(riderId).then((response) => {
      // setIsVisibleModalSearch(false);
      setRider(response.data.rider);
    });

  const LiRider = (rider) => (
    <li className={styles.item} key={rider._id} onClick={() => getRiderData(rider._id)}>
      {`${rider.lastName} ${rider.firstName} (${rider.firstNameZwift} ${rider.lastNameZwift})`}
    </li>
  );

  return (
    <form className={styles.form} name="riders">
      <SimpleInput
        state={state}
        setState={setState}
        property="fio"
        type="text"
        placeholder="Введите имя (фамилию) райдера"
      />
      <ul className={styles.list}>
        {riders.length ? filteredRiders.map((rider) => LiCurrent(rider)) : undefined}
        {filteredRiders.length > 14 ? (
          <li className={styles.itemMore}>
            ...еще {riders.length - filteredRiders.length} райдеров
          </li>
        ) : undefined}
      </ul>
    </form>
  );
}

export default BoxRider;
