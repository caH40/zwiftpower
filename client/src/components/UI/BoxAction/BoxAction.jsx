import classNames from 'classnames/bind';

import ButtonText from '../ButtonText/ButtonText';

import styles from './BoxAction.module.css';

const cx = classNames.bind(styles);

/**
 * Бокс Иконка и текс для выполнения функции getClick при клике на бокс
 */
function BoxAction({ Icon, getClick, isActive, children }) {
  return (
    <div onClick={getClick} className={cx('box', { notDisabled: isActive })}>
      <Icon isActive={isActive} squareSize={19} />
      <ButtonText disabled={!isActive}>{children}</ButtonText>
    </div>
  );
}

export default BoxAction;
