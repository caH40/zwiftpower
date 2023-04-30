## Описание модели ZwiftResult.js

**zwiftEventId** - (`ObjectId`) id (ссылка) заезда к которому относится результат;  
**subgroupId** -(`ObjectId`) id (ссылка) подгруппы (группы категорий в заезде) к которой
относится результат;  
**profileId** -(`Number`) id райдера в Звифте;  
**profileData** -(`Object`) объект профиля райдера:

- **firstName** -(`String`) имя;
- **lastName** -(`String`) фамилия;
- **gender** -(`String`) пол:
  - MALE;
  - FEMALE;
- **weightInGrams** -(`Number`) вес в граммах;
- **heightInCentimeters** -(`Number`) рост в сантиметрах;
- **imageSrc** -(`String`) имя;

**eventSubgroupId** -(`Number`) id подгруппы (группы категорий в заезде) в Звифте;  
**subgroupLabel** -(`String`) буквенное обозначение подгруппы (группы категорий в заезде);  
**rank** -(`Number`) финишная позиция в группе;  
**rankEvent** -(`Number`) финишная позиция в заезде согласно правилам заезда;  
**eventId** -(`Number`) id заезда в Звифте;  
**activityData** -(`Object`) объект профиля райдера:

- **activityId** -(`String`) id активности (тренировки) в Звифт для данного райдера;
- **sport** -(`String`) название спортивной активности:
  - CYCLING;
- **durationInMilliseconds** -(`Number`) длительность гонки в миллисекундах;

**sensorData** -(`Object`) данные, получаемые с датчиков:

- **heartRateData** -(`Object`) датчик сердечного ритма:
  - **avgHeartRate** -(`Number`) среднее количество ударов в минуту;
- **avgWatts** -(`Number`) средняя мощность в ваттах;
- **powerType** -(`String`) тип мощности:
  - POWER_METER;

**wattsPerKg** -(`Number`) относительная мощность вт/кг;  
**flaggedCheating** -(`Boolean`) пойман на читинге;  
**flaggedSandbagging** -(`Boolean`) пойман на сэндбэгинге;  
**rankAbsolute** -(`Number`) место в абсолюте (необходимость?);  
**penalty** -(`Object`) штрафы (необходимость?):

- **fairPlay** -(`Number`) штраф за "нечестные" действия, единица измерения равная 30секундам;

**isDisqualification** -(`Boolean`) дисквалифицирован, аннулирование результата текущей гонки;  
**isDidNotFinish** -(`Boolean`) не финишировал;  
**category** -(`Number`) (необходимость?);  
**categoryCurrent** -(`Number`) категория согласно результата текущего заезда
(необходимость?);  
**teamCurrent** -(`Number`) команда за которую выступал райдер в текущем заезде;  
**pointsStage** -(`Number`) очки за текущий заезд (для серии/тура);  
**addedManually** -(`Number`) результат добавлен в ручную;
