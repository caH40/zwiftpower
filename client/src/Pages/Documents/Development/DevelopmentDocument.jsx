import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

import test from './SeriesResultsUpdater.md?raw';
import styles from './DevelopmentDocument.module.css';

export default function DevelopmentDocumentPage() {
  const params = useParams();

  return (
    <div className={styles.wrapper}>
      <Markdown rehypePlugins={[rehypeHighlight]}>{test}</Markdown>
    </div>
  );
}
