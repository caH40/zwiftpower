import { Link } from 'react-router-dom';

export default function OrganizerSeriesEdit() {
  return (
    <section>
      Выберите Серию для редактирования на странице:{' '}
      <Link className="link" to="/organizer/series/list">
        Список Серий заездов
      </Link>
    </section>
  );
}
