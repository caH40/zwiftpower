import React from 'react';
import cn from 'classnames';

import { addClasses as cns } from '../../../utils/additional-classes';
import { getStringDate } from '../../../utils/format-date';
import { convertToKBites } from '../../../utils/format-numbers';

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
        <dl>{convertToKBites(file.size)} кБ</dl>
      </div>
      <div className={styles.box}>
        <dt className={styles.title}>Изменялся:</dt>
        <dl>{getStringDate(file.lastModified)}</dl>
      </div>
    </dl>
  );
}

export default DlFile;
