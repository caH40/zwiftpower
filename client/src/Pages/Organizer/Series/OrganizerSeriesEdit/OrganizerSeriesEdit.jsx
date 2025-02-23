import { Link } from 'react-router-dom';

export default function OrganizerSeriesEdit() {
  return (
    <div>
      Выберите Серию для редактирования на странице:{' '}
      <Link className="link" to="/organizer/series/list">
        Список Серий заездов
      </Link>
    </div>
  );
}
