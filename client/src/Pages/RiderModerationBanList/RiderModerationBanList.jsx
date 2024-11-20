import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import TableRiderBans from '../../components/Tables/TableRiderBans/TableRiderBans';

import styles from './RiderModerationBanList.module.css';

/**
 * Страница управления баннами райдеру.
 */
export default function RiderModerationBanList() {
  useTitle('Блокировки райдера');
  const { zwiftId } = useParams();
  const { bans } = useSelector((state) => state.riderBan);

  return (
    <section className={styles.wrapper}>
      <TableRiderBans zwiftId={zwiftId} bans={bans} />
    </section>
  );
}
