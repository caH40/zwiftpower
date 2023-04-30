import React from 'react';

function Flag({ name = '' }) {
  let nameShort = name.slice(0, 2);
  if (name === 'ukr') nameShort = 'ua';
  if (name === 'tur') nameShort = 'tr';
  if (name === 'dnk') nameShort = 'dk';
  if (name === 'swe') nameShort = 'se';
  if (name === 'kor') nameShort = 'kr';
  if (name === 'pol') nameShort = 'pl';
  if (name === 'and') nameShort = 'ad';
  return (
    <>
      <img
        className={StyleSheet.img}
        src={`/images/flags/${nameShort}.svg`}
        alt={`flag-${name}`}
      />
    </>
  );
}

export default Flag;
