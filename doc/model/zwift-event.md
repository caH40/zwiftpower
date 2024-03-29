## Описание модели ZwiftEvent.js

### Параметры, устанавливаемые вручную при добавлении заезда.

**seriesId** - (`ObjectId`) id (ссылка) на серию (тур) заездов. Может быть undefined, если заезд
не относиться к серии;  
**typeRaceCustom** -(`String`) тип заезда. Влияет на распределение мест и подсчет очков в
итоговом протоколе:

- catchUp - догонялки;
- newbies - для новичков. Группы C,D,E. В группу "E" присоединяются все остальные категории.
  Общий старт, темп заедает лидер заезда. Лидер дает сигнал для старта гонки в котором участвуют
  категории C, D, а группа Е продолжает ехать легким темпом;
- classicGroup - классический заезд с разделением по группам;
- classicCommon - классический заезд без разделения по группам, деление только по полу;
- сriterium - критериум;

**organizer** - (`String`) организатор заезда:

- KOM-on;

**updated** - (`Number`) время обновления(создания) документа;  
**started** - (`Boolean`) был старт заезда;  
**creator** - (`ObjectId`) id (ссылка) пользователя, который добавил заезд в БД;  
**hasResults** - (`Boolean`) получены все результаты заезда;  
**needCount** - (`Boolean`) надо ли учитывать результаты в Series (если заезд из Series);  
**totalFinishedCount** - (`Number`) количество финишировавших;

**modifiedResults** - (`Object`) данные о ручном изменении результатов Эвента и последующем пересчете ранкинга:  
  - **hasModified** -  (`Boolean`) вносились или нет изменения в результаты;
  - **moderators** - (`Array`) данные о том кто вносил изменения:
    - **moderatorId** - (`ObjectId`) id (ссылка) на на User, который внёс изменения;
    - **date** - (`Number`) дата изменения;
    - **action** - (`Object`) данные об вносимом изменении:
      - **property** - (`String`) название изменяемого свойства;
      - **value** - (`String`) нзачение изменяемого свойства;
      - **rider** - (`String`) имя и фамилия райдера, чей результат изменяется;
      - **message** - (`String`) пояснение к вносимому изменению;

### Параметры принимаемые из объекта Event с БД Zwift.

**id** - (`Number`) id заезда;  
**mapId** - (`Number`) номер карты `client\src\asset\zwift\lib\esm\worlds.js`;  
**categoryEnforcement** - (`Boolean`) принудительная категоризация райдеров ;  
**accessExpression** - (`String`) Значение для categoryEnforcement:true
`(subgroup.label == 1 && powerCurves.category == 0) || (powerCurves.category != 5 && powerCurves.category >= subgroup.label) || (powerCurves.category == 5 && (subgroup.label == 1 || subgroup.label == 5))`;  
**cullingType** - (`String`) видимость райдеров:

- "CULLING_EVENT_ONLY" - видны все райдеры в заезде;
- "CULLING_SUBGROUP_ONLY" - видны только райдеры из своей группы;

**description** - (`String`) - общее описание заезда;  
**eventStart** - (`String`) - общее время старта заезда;  
**eventType** - (`String`) - тип заезда:

- "RACE" - гонка, с соответствующими правилами (правила уточняются);
- "GROUP" - заезд, с соответствующими правилами (правила уточняются);

**type** - (`String`) - тип заезда: `!!!устаревший параметр, заменён на eventType? `

- "EVENT_TYPE_RACE" - гонка, с соответствующими правилами (правила уточняются);
- "EVENT_TYPE_GROUP_RIDE" - заезд, с соответствующими правилами (правила уточняются);

**imageUrl** - (`String`) - ссылка на постер заезда;  
**microserviceExternalResourceId** - (`String`) - id клуба из которого создается заезд;
**microserviceEventVisibility** - (`String`) - приватность заезда:

- "PUBLIC" - все могут участвовать в заезде;
- "SHAREABLE" - все могут участвовать в заезде;
- "DEFINED_BY_RESOURCE_ID" - заезд для клуба;

**name** - (`String`) - название заезда;  
**rulesSet** - (`[String]`) - перечень правил для заезда `client\src\asset\zwift\rule.js`;  
**tags** - (`[String]`) - перечень тэгов;  
**visible** - (`Boolean`) - видимость (значение уточняется);  
**timeTrialOptions** - (`Object`) - параметры для ТТ заезда:

- maxRidersPerRow - (`Number`) нет данных;
- maxRows - (`Number`) нет данных;
- timeGapBetweenRowsMs - (`Number`) нет данных;

**totalEntrantCount** - (`Number`) - количество зарегистрированных райдеров;  
**totalJoinedCount** - (`Number`) - количество принявших участие в заезде;  
**totalSignedUpCount** - (`Number`) - количество зарегистрированных райдеров;

---

**eventSubgroups** - (`[Object]`) - перечень объектов с параметрами групп в заезде:

### Описание свойств для каждой группы:

**bikeHash** - (`Number`) - id велосипедной рамы для группы
`client\src\asset\zwift\lib\esm\bikeFrames.js`;  
**description** - (`String`) - описание для группы;  
**eventSubgroupStart** - (`String`) - старт группы (-3ч от московского времени);  
**id** - (`Number`) - id группы в Звифте;  
**jerseyHash** - (`Number`) - id джерси для группы
`client\src\asset\zwift\lib\esm\jerseys.js`;  
**label** - (`Number`) - id группы (id категории):

- **1** - группа "A";
- **2** - группа "B";
- **3** - группа "C";
- **4** - группа "C";
- **5** - группа "E";

**laps** - (`Number`) - количество кругов (durationInSeconds,distanceInMeters =0 );  
**distanceInMeters** - (`Number`) - дистанция в метрах (laps,durationInSeconds =0 );  
**durationInSeconds** - (`Number`) - длительность заезда в секундах (laps,distanceInMeters =0
);  
**distanceSummary** - (`Object`) - вычисляемые данные маршрута:

- **distanceInKilometers** - (`Number`) - расстояние дистанции в километрах;
- **elevationGainInMeters** - (`Number`) - суммарный набор высоты в метрах;

<!-- **zwiftInsiderUrl** - (`String`) - ссылка на страницу zwiftInsider описания маршрута;   -->

**name** - (`String`) - название заезда;  
**routeId** - (`Number`) - id маршрута `client\src\asset\zwift\lib\esm\routes.js`;  
**rulesSet** - (`[String]`) - см.выше;  
**subgroupLabel** - (`String`) - буквенное обозначение группы:

- **A** - группа "A";
- **B** - группа "B";
- **C** - группа "C";
- **D** - группа "C";
- **E** - группа "E";

**tags** - (`[String]`) - перечень тэгов;  
**timeTrialOptions** - (`Object`) - см.выше;  
**totalEntrantCount** - (`Number`) - количество зарегистрированных райдеров;  
**totalJoinedCount** - (`Number`) - количество принявших участие в заезде;  
**totalSignedUpCount** - (`Number`) - количество зарегистрированных райдеров;
