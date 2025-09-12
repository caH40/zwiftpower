import MyTooltip from '../../HOC/MyTooltip';

import styles from './Flag.module.css';

function Flag({ name = '', width, height }) {
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

    case 'ata':
      nameShort = 'aq';
      break;

    case 'kaz':
      nameShort = 'kz';
      break;

    case 'isr':
      nameShort = 'il';
      break;

    case 'arm':
      nameShort = 'am';
      break;

    case 'est':
      nameShort = 'ee';
      break;

    case 'spm':
      nameShort = 'pm';
      break;

    case 'srb':
      nameShort = 'rs';
      break;

    case 'jam':
      nameShort = 'jm';
      break;

    case 'prt':
      nameShort = 'pt';
      break;

    default:
      nameShort = name.slice(0, 2);
      break;
  }

  return (
    <MyTooltip tooltip={name}>
      <img
        className={styles.box}
        src={`/images/flags/${nameShort}.svg`}
        alt={`flag-${name}`}
        width={width}
        height={height}
      />
    </MyTooltip>
  );
}

export default Flag;
