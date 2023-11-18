import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './LinksRoute.module.css';

const cx = classNames.bind(styles);

function LinkRouter({ link, linkFavicon, text }) {
  const [mouseEnter, setMouseEnter] = useState(false);
  return (
    link && (
      <div className={cx('route__p')}>
        <img className={cx('icon', { mouseEnter })} src={linkFavicon} />
        <a
          onMouseEnter={() => {
            setMouseEnter(true);
          }}
          onMouseLeave={() => {
            setMouseEnter(false);
          }}
          className={cx('link')}
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          {text}
        </a>
      </div>
    )
  );
}

export default LinkRouter;
