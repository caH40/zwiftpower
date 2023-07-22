import React from 'react';
import cn from 'classnames';

import { addClasses as cns } from '../../../utils/additional-classes';
import { getTimerLocal } from '../../../utils/date-local';
import { convertToKBytes } from '../../../utils/bytes';

import styles from './DlFile.module.css';

function DlFile({ file, addCls }) {
  return (
    <dl className={cn(styles.dl, cns(styles, addCls))}>
      <div className={styles.box}>
        <dt className={styles.title}>Имя файла:</dt>
        <dl>{file.name}</dl>
      </div>
      <div className={styles.box}>
        <dt className={styles.title}>Размер:</dt>
        <dl>{convertToKBytes(file.size)} кБ</dl>
      </div>
      <div className={styles.box}>
        <dt className={styles.title}>Изменялся:</dt>
        <dl>{getTimerLocal(file.lastModified, 'YMDHM')}</dl>
      </div>
    </dl>
  );
}

export default DlFile;
