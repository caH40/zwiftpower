import { useSelector } from 'react-redux';

const useLoader = () => {
  const { status: statusEvents } = useSelector((state) => state.fetchEvents);
  const { status: statusEvent } = useSelector((state) => state.fetchEventResult);
  const { status: statusResults } = useSelector((state) => state.fetchResults);
  const { status: statusChangeEvent } = useSelector((state) => state.fetchChangeEvent);
  const { status: statusEventPreview } = useSelector((state) => state.fetchEventPreview);
  const { status: statusDownloadResults } = useSelector((state) => state.downloadResults);

  if (
    statusEvents === 'loading' ||
    statusEvent === 'loading' ||
    statusResults === 'loading' ||
    statusChangeEvent === 'loading' ||
    statusEventPreview === 'loading' ||
    statusDownloadResults === 'loading'
  ) {
    return { isLoading: true };
  }
  return { isLoading: false };
};

export default useLoader;
