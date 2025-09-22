import { createHtml } from '../../utils/html';

import styles from './Document.module.css';

/**
 * Компонент формирование документа.
 */
export default function Document({ dataJson }) {
  return (
    <div className={styles.wrapper}>
      {dataJson.application && (
        <div className={styles.wrapper__application}>
          <h4 className={styles.title__application}>{dataJson.application}</h4>
          <h4 className={styles.title__application}>{dataJson.applicationAffiliation}</h4>
        </div>
      )}

      <h2 className={styles.title}>{dataJson.title}</h2>
      <p className={styles.updated}>{dataJson.lastUpdated}</p>

      {dataJson.sections.map((section, indexSection) => (
        <div key={indexSection} className={styles.section}>
          <h3 className={styles.title__section}>
            {section.number && `${section.number}. `}
            {section.title}
          </h3>

          {section.content.map((contentItem, indexContent) => (
            <div key={indexContent} className={styles.content__item}>
              <p className={styles.content__text}>
                {contentItem.number} {createHtml.renderTextWithLinks(contentItem.text)}
              </p>

              {contentItem.term && (
                <ul className={styles.list__term}>
                  {contentItem.term.map((termItem, index) => (
                    <li key={index} className={styles.item}>
                      <strong className={styles.term}>{termItem.term}:</strong>{' '}
                      {createHtml.renderTextWithLinks(termItem.definition)}
                    </li>
                  ))}
                </ul>
              )}

              {contentItem.list && (
                <ul className={styles.list__circle}>
                  {contentItem.list.map((item, index) => (
                    <li key={index} className={styles.item}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {contentItem.contentSecond &&
                contentItem.contentSecond.map((contentSecond, index) => (
                  <p className={styles.contentSecond__text} key={index}>
                    {contentSecond.number}. {createHtml.renderTextWithLinks(contentSecond.text)}
                  </p>
                ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
