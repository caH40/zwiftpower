import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setMainParams, setSubgroupParams } from '../../../../redux/features/eventParamsSlice';

import styles from './RSelect.module.css';

function RSelectId({ subgroupIndex, label, property, disabled, options }) {
  const {
    eventMainParams,
    eventSubgroup_0,
    eventSubgroup_1,
    eventSubgroup_2,
    eventSubgroup_3,
    eventSubgroup_4,
  } = useSelector((state) => state.eventParams);
  const dispatch = useDispatch();

  const inputHandler = subgroupIndex || subgroupIndex === 0 ? setSubgroupParams : setMainParams;

  /* eslint-disable */
  const blockWithParameters = () => {
    switch (subgroupIndex) {
      case 0:
        return eventSubgroup_0;
      case 1:
        return eventSubgroup_1;
      case 2:
        return eventSubgroup_2;
      case 3:
        return eventSubgroup_3;
      case 4:
        return eventSubgroup_4;
      default:
        return eventMainParams;
    }
  };
  /* eslint-enable */

  return (
    <>
      <label className={styles.label}>{label || property}</label>
      <select
        className={styles.select}
        value={blockWithParameters()[property]} // select не может быть null
        onChange={(e) => {
          dispatch(inputHandler({ [property]: +e.target.value, index: subgroupIndex }));
        }}
        disabled={disabled}
      >
        <option className={styles.option} value=""></option>
        {options.map((element) => (
          <option className={styles.option} value={element.id} key={element.id}>
            {element.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default RSelectId;
