import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm'; // <-- обязательно для таблиц
import 'highlight.js/styles/github.css';

import styles from './DocumentContent.module.css';

export default function DocumentContent({ content }) {
  return (
    <div className={styles.wrapper}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // <-- добавляем поддержку таблиц
        rehypePlugins={[rehypeHighlight]} // <-- подсветка кода
        components={{
          table: ({ node, ...props }) => <table className={styles.table} {...props} />,
          th: ({ node, ...props }) => <th className={styles.th} {...props} />,
          td: ({ node, ...props }) => <td className={styles.td} {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
