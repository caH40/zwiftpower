import React from 'react';

function Flag({ name = '' }) {
  let nameShort = '';

  switch (name) {
    case 'ukr':
      nameShort = 'ua';
      break;

    case 'tur':
      nameShort = 'tr';
      break;

    case 'dnk':
      nameShort = 'dk';
      break;

    case 'swe':
      nameShort = 'se';
      break;

    case 'kor':
      nameShort = 'kr';
      break;

    case 'pol':
      nameShort = 'pl';
      break;

    case 'and':
      nameShort = 'ad';
      break;

    case 'blr':
      nameShort = 'by';
      break;

    default:
      nameShort = name.slice(0, 2);
      break;
  }

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
