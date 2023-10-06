import { useSelector } from 'react-redux';

const useLoader = () => {
  const { status: statusEvents } = useSelector((state) => state.fetchEvents);
  const { status: statusEvent } = useSelector((state) => state.fetchEventResult);
  const { status: statusResults } = useSelector((state) => state.fetchResults);
  const { status: statusChangeEvent } = useSelector((state) => state.fetchChangeEvent);
  const { status: statusEventPreview } = useSelector((state) => state.fetchEventPreview);
  const { status: statusDownloadResults } = useSelector((state) => state.downloadResults);
  const { status: statusRidersInEventsFetch } = useSelector(
    (state) => state.ridersInEventsFetch
  );
  const { status: statusLeadersInIntervals } = useSelector(
    (state) => state.leadersInIntervalsFetch
  );
  const { status: statusResultsSeries } = useSelector((state) => state.fetchResultsSeries);
  const { status: statusSeries } = useSelector((state) => state.fetchSeries);
  const { status: statusUserResults } = useSelector((state) => state.fetchUserResults);
  const { status: statusUserPowerCurve } = useSelector((state) => state.fetchUserPowerCurve);

  if (
    statusEvents === 'loading' ||
    statusEvent === 'loading' ||
    statusResults === 'loading' ||
    statusChangeEvent === 'loading' ||
    statusEventPreview === 'loading' ||
    statusDownloadResults === 'loading' ||
    statusRidersInEventsFetch === 'loading' ||
    statusLeadersInIntervals === 'loading' ||
    statusResultsSeries === 'loading' ||
    statusSeries === 'loading' ||
    statusUserResults === 'loading' ||
    statusUserPowerCurve === 'loading'
  ) {
    return { isLoading: true };
  }
  return { isLoading: false };
};

export default useLoader;
