import { useDispatch } from 'react-redux';

import { fetchDeletePollAnswers } from '../../../redux/features/api/poll/fetchPoll';
import IconDelete from '../../icons/IconDelete';

import styles from './PopupMenuTable.module.css';

/**
 * Попап меню для управления голосованием.
 */
function PopupMenuPoll({ pollId, setShowMenu }) {
  const dispatch = useDispatch();
  // Обработчик нажатия на кнопку обновления результатов этапа серии.,
  const handleResetVote = (e) => {
    e.stopPropagation();
    dispatch(fetchDeletePollAnswers({ pollId }));
    setShowMenu(false);
  };

  return (
    <div className={styles.popup} onMouseLeave={() => setShowMenu(false)}>
      <ul className={styles.list}>
        <li className={styles.item} onClick={(e) => handleResetVote(e)}>
          <IconDelete squareSize={18} />
          <span className={styles.label}>Сбросить голос</span>
        </li>
      </ul>
    </div>
  );
}

export default PopupMenuPoll;
