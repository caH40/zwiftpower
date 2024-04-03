import cn from 'classnames/bind';

import styles from './LogoRider.module.css';

const cx = cn.bind(styles);

/**
 * Компонент отображения логотипа участника гонки.
 * @param {Object} props - Свойства компонента.
 * @param {string} props.source - Источник изображения участника гонки.
 * @param {string} props.firstName - Имя участника гонки.
 * @param {string} props.lastName - Фамилия участника гонки.
 * @param {Function} props.enlargeLogo - Функция для увеличения логотипа при клике.
 * @returns {JSX.Element} - Элемент интерфейса для отображения логотипа участника гонки.
 */
function LogoRider({ source, firstName, lastName, enlargeLogo }) {
  const name = (firstName?.slice(0, 1) || '') + (lastName?.slice(0, 1) || '');

  return (
    <>
      {source ? (
        <img
          className={cx('img', { zoom: source })}
          src={source}
          alt="Ph"
          onClick={() => enlargeLogo(source)}
        />
      ) : (
        <div className={cx('empty')}>{name}</div>
      )}
    </>
  );
}

export default LogoRider;
