import { useSelector } from 'react-redux';

// отображение загрузки данных с API
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
  const { status: statusRiderMetrics } = useSelector((state) => state.riderMetrics);
  // обновление данных профиля с zwiftAPI
  const { status: statusProfileRefresh } = useSelector((state) => state.profileRefresh);
  // данные для страницы "Распределение райдеров по FTP"
  const { status: statusRidersTotalFTPFetch } = useSelector(
    (state) => state.ridersTotalFTPFetch
  );
  // запрос всех зарегистрированных пользователей
  const { status: statusGetUsers } = useSelector((state) => state.getUsers);
  // модерация результатов райдеров в протоколе заезда
  const { status: statusResultEdit } = useSelector((state) => state.resultEdit);
  // запросы работы с логами
  const { status: statusLogsAdmins } = useSelector((state) => state.logsAdmins);
  const { status: statusLogsErrors } = useSelector((state) => state.logsErrors);
  const { status: statusLogError } = useSelector((state) => state.logError);
  const { status: statusLogErrorDelete } = useSelector((state) => state.logErrorDelete);
  //  получение данных Эвента с ZwiftAPI
  const { status: statusEventParams } = useSelector((state) => state.eventParams);
  const { status: statusZwiftClub } = useSelector((state) => state.zwiftClub);
  const { status: statusClubModerator } = useSelector((state) => state.clubModerator);
  const { status: statusFetchRiders } = useSelector((state) => state.riders);
  const { status: statusUsersEnabledStreams } = useSelector(
    (state) => state.usersEnabledStreams
  );
  const { status: statusOrganizerModerator } = useSelector((state) => state.organizerModerator);
  const { status: statusNotification } = useSelector((state) => state.notification);
  const { status: statusSeriesPublic } = useSelector((state) => state.seriesPublic);
  const { status: statusSeriesOrganizer } = useSelector((state) => state.seriesOrganizer);

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
    statusUserPowerCurve === 'loading' ||
    statusRiderMetrics === 'loading' ||
    statusProfileRefresh === 'loading' ||
    statusRidersTotalFTPFetch === 'loading' ||
    statusGetUsers === 'loading' ||
    statusResultEdit === 'loading' ||
    statusLogsAdmins === 'loading' ||
    statusLogsErrors === 'loading' ||
    statusLogError === 'loading' ||
    statusLogErrorDelete === 'loading' ||
    statusEventParams === 'loading' ||
    statusZwiftClub === 'loading' ||
    statusClubModerator === 'loading' ||
    statusFetchRiders === 'loading' ||
    statusUsersEnabledStreams === 'loading' ||
    statusOrganizerModerator === 'loading' ||
    statusNotification === 'loading' ||
    statusSeriesPublic === 'loading' ||
    statusSeriesOrganizer === 'loading'
  ) {
    return { isLoading: true };
  }
  return { isLoading: false };
};

export default useLoader;
