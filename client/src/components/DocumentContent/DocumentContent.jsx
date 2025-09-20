import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

import styles from './DocumentContent.module.css';

export default function DocumentContent({ content }) {
  return (
    <div className={styles.wrapper}>
      <Markdown rehypePlugins={[rehypeHighlight]}>{content}</Markdown>
    </div>
  );
}
