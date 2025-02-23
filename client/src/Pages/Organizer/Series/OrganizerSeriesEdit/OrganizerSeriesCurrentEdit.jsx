import { useParams } from 'react-router-dom';

/**
 * Страница редактирования Серии заездов.
 */
export default function OrganizerSeriesCurrentEdit() {
  const { seriesId } = useParams();

  // const
  return (
    <div>
      OrganizerSeriesCurrentEdit seriesId:<b>{seriesId}</b>
    </div>
  );
}
