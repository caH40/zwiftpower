import classNames from 'classnames/bind';

import MyTooltip from '../../../HOC/MyTooltip';

import styles from './ButtonCategory.module.css';

const cx = classNames.bind(styles);
/**
 * Кнопка для добавления группы в заезд при редактировании параметров заезда
 * @param {{label: string}} label название группы
 */
function ButtonCategory({ getClick, label, tooltip }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <button className={cx('button', { [label]: label })} onClick={() => getClick(label)}>
        {label}
      </button>
    </MyTooltip>
  );
}

export default ButtonCategory;
