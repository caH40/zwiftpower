import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FindZwiftProfileNew from '../../FindZwiftProfile/FindZwiftProfileNew';
import useBlockParameters from '../../../../hook/useBlockParameters';
import RInvitedLeadersGroup from '../RInvitedLeadersGroup/RInvitedLeadersGroup';

import styles from './RInvitedLeaders.module.css';

/**
 * Изменение массива invitedLeaders,invitedSweepers для параметров подгруппы в Эвенте
 * @param property {string} invitedLeaders или invitedSweepers, изменяемый параметр
 * @param subgroupIndex {number} номер подгруппы от 1(A) до 5(E)
 */
function RInvitedLeaders({ property, subgroupIndex }) {
  // blockWithParameters - данные из стора в подгруппе subgroupIndex из свойства property
  const { inputHandler, blockWithParameters } = useBlockParameters(subgroupIndex);
  const [leaders, setLeaders] = useState(blockWithParameters()[property]);

  const { profile } = useSelector((state) => state.getZwiftProfile);
  const dispatch = useDispatch();

  // сохранение zwiftId в массив лидеров
  const saveInvitedLeaders = () => {
    dispatch(inputHandler({ [property]: [...leaders, profile.id], index: subgroupIndex }));
    setLeaders((prev) => [...prev, profile.id]);
  };

  // удаление zwiftId из лидеров
  const deleteLeader = (zwiftId) => {
    dispatch(
      inputHandler({
        [property]: [...leaders].filter((elm) => elm !== zwiftId),
        index: subgroupIndex,
      })
    );
    setLeaders((prev) => prev.filter((elm) => elm !== zwiftId));
  };
  return (
    <div className={styles.wrapper}>
      <FindZwiftProfileNew hideAdditionalBlock={true} saveZwiftId={saveInvitedLeaders} />

      <RInvitedLeadersGroup
        leadersType={property}
        leaders={leaders}
        deleteLeader={deleteLeader}
      />
    </div>
  );
}

export default RInvitedLeaders;
