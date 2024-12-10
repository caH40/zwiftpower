import { syntaxHighlight } from '../../utils/hightlight';

import styles from './JSONBlock.module.css';

function JSONBlock({ json }) {
  return (
    <div className={styles.group}>
      <pre
        className={styles.scrollable}
        dangerouslySetInnerHTML={{
          __html: syntaxHighlight(JSON.stringify(json, undefined, 4)),
        }}
      />
    </div>
  );
}

export default JSONBlock;
