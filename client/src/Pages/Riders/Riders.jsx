import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import NavBarSignedRiders from '../../components/UI/NavBarSignedRiders/NavBarSignedRiders';
import TableSignedRiders from '../../components/Tables/TableSignedRiders/TableSignedRiders';
import { fetchRiders } from '../../redux/features/api/riders/fetchRiders';

import styles from './Riders.module.css';

function Riders() {
  useTitle('Участники заездов');
  const { riders } = useSelector((state) => state.riders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRiders());
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.align__right}></div>
      <NavBarSignedRiders />
      <section className={styles.wrapper__wide}>
        <TableSignedRiders riders={riders} />
      </section>
    </div>
  );
}

export default Riders;
