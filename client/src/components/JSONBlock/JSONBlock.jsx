import React from 'react';

import { syntaxHighlight } from '../../utils/hightlight';

import styles from './JSONBlock.modules.css';

function JSONBlock({ json }) {
  return (
    <div className={styles.group}>
      <pre
        dangerouslySetInnerHTML={{
          __html: syntaxHighlight(JSON.stringify(json, undefined, 4)),
        }}
      />
    </div>
  );
}

export default JSONBlock;
