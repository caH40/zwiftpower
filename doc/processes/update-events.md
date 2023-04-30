1. в zp-server.js вызов функции _timers()_;
2. в ./service/timer.js с вызываются 3 функции:

- с интервалом 30 минут:
  - _updateStartInfo()_ обновление свойства в модели "ZwiftEvent"
  - _updateScheduleEvents()_ обновление всех документов ZwiftEvent в расписании;
- с интервалом 10 минут:
  - _updateResults()_ обновление всех документов ZwiftEvent в результатах (истории);

### updateStartInfo()

если текуще время больше времени старта (старт был), то обновление свойства `{started: true}` в
модели "ZwiftEvent"

### updateScheduleEvents()

запрос всех документов "ZwiftEvent" у которых `{started: false}` => вызов _putEventService(id
заезда)_ для каждого полученного Event из БД;

### updateResults()

запрос всех документов "ZwiftEvent" у которых `{started: true} and { hasResults: false }`
которые стартовали, но нет еще окончательных результатов;

1. вызов _checkDurationUpdating(event)_ если со старта прошло больше 2х часов, то обновляется
   свойство на { hasResults: true }, то есть получены окончательные результаты;
2. получение результатов из Звифта;
3. вызов _handlerProtocol(id event из БД, результаты из Звифта, тип гонки event.typeRaceCustom
   )_;

### handlerProtocol()

в зависимости от типа гонки event.typeRaceCustom вызывается соответствующий обработчик
результатов для формирования протокола заезда;
