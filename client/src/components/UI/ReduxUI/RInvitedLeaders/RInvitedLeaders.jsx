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
  const { inputHandler, blockWithParameters } = useBlockParameters(subgroupIndex);
  const [leaders, setLeaders] = useState(blockWithParameters()[property]);

  const { profile } = useSelector((state) => state.getZwiftProfile);
  const dispatch = useDispatch();

  const saveInvitedLeaders = () => {
    dispatch(inputHandler({ [property]: [...leaders, profile.id], index: subgroupIndex }));
    setLeaders((prev) => [...prev, profile.id]);
  };
  return (
    <div className={styles.wrapper}>
      <FindZwiftProfileNew hideAdditionalBlock={true} saveZwiftId={saveInvitedLeaders} />

      <RInvitedLeadersGroup leadersType={property} leaders={leaders} />
    </div>
  );
}

export default RInvitedLeaders;
