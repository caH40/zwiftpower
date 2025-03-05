import cn from 'classnames/bind';

import styles from './TitleWithUnderline.module.css';

const cx = cn.bind(styles);

/**
 * Заголовок с градиентной линией подчеркивания.
 * @param {object} props - Пропсы.
 * @param {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} props.tag - Тег заголовка.
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'| 'xxxl'} [props.size] - Размер шрифта.
 */
export default function TitleWithUnderline({ children, tag = 'h3', size }) {
  const Tag = tag; // Используем переданный тег как компонент

  return <Tag className={cx('title', size)}>{children}</Tag>;
}
