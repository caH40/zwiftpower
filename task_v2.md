# Планирование разработки проекта для версии v2

2.0.0 +переход на семантическое версионирование;  
2.0.1 +страница "Серии заездов". Страница Догонялок;  
2.0.2 +названия для таблиц, исправление мелких багов;  
2.1.1 +добавить интерактивное изменение информационных блоков;  
2.2.1 +ссылки на роуты из описания Эвента;  
2.2.3 +бот дублирующий сообщения о новых фитчах для группы zwiftpowerru в тегеграмме;  
2.2.4 +изменение логики подключения к группам для райдеров без категории при строгой
категоризации;  
2.2.5 +изменение названия флага Белорусии;  
2.2.6 +замена if на switch в компоненте Flag.jsx;  
2.2.7 +на странице Догонялки в мобильной версии исправить баг: отсутствие значений в столбце
"Результаты";  
2.3.1 +фильтр результатов по названию на странице результаты эвентов. Выбор количества записей
(результатов) отображения на странице;  
2.3.2 +фильтр и выбор количества записей на странице для логов;  
2.3.3 +баг: если при фильтрации таблицы пагинация "застряла" на странице больше чем страниц
после фильтрации, то ничего не показывается;  
2.3.4 +улучшение строки пагинации когда много страниц;  
2.4.1 +приблизительное определение категорий согласно правилам Звифта Category Enforcement;
2.4.2 +фиксация бага при отображении относительной мощности за гонку;  
2.5.1 +страница ЧЗД. Описание определения категорий;  
2.5.2 +исправление небольших багов;  
2.5.3 +описание иконок;  
2.5.4 +таблица определения категорий для женщин;  
2.6.1 +наполнение подвала информацией;  
2.6.2 +добавления иконки серии в таблицу расписания заездов;  
2.6.3 +уменьшение иконки телеграм в футоре;  
2.6.4 +изменение стилизации карточки анонса заезда на главной странице;  
2.7.1 +открытие страницы каждый раз с шапки страницы;  
2.8.1 +подключение Jest тестов. Тест для функции roundValue;  
2.8.2 +тест для функций getCategoryZFTP, getCategoryZMAP;  
2.8.3 +оптимизировать модули по обработке даты, несколько модулей с похожими функциями;  
2.9.1 +профиль мощности (график мощности ) за 90 дней;  
2.9.2 +фиксация багов при отображении графиков;  
2.9.3 +исправление соотношения сторон при отображении графиков;  
2.9.4 +выбор заезда для сравнения мощностей с 90 дневным;  
2.9.5 +исправление багов на странице графика мощности;  
2.9.6 +переключение графика с мощности на относительную мощность;  
2.9.7 +исправление бага: при формировании кривой мощности не все результаты максимальные за
период 90 дней;  
2.9.8 +поменяны местами "удельная мощность" и "средняя мощность" за гонку в таблице
результатов;  
2.9.9 +исправление бага при отображении флага райдера в браузере safari;  
2.9.10 +добавление флага Антарктиды;  
2.9.11 +проверка десктопной версии страницы результатов заездов;  
2.9.12 +исправление бага в блоке пагинации когда общее количество страниц равно 8;  
2.9.13 +изменение микроразметки og;  
2.9.14 +удалил косую черту в head в meta тегах;  
2.9.15 +замена new Date() на Intl.DateTimeFormat();  
2.9.16 +добавил в игнор паттерн eslint папку build;  
2.9.17 +исправление бага при запросе активности у приватного аккаунта райдера из API Звифта;
2.10.0 +переход на Vitejs;  
2.10.1 +очистка кода от старой функциональности для бота RaceInfo;  
2.10.2 +проверка и исправление замечаний eslint;  
2.10.3 +добавление в ЧЗВ вопроса: почему нет данных CP за заезд;  
2.10.4 +исправление орфографических ошибок в ЧЗВ;  
2.10.5 +очистка бэка от старого кода;  
2.11.0 +перенос сервера с js на ts;  
2.11.1 +перенос модулей routers, controllers на typescript;  
2.11.2 +типизация схем и моделей mongodb;  
2.11.3 +типизация middleware;  
2.11.4 +типизация сервисов по постингу сообщений о релизах разработки;  
2.11.5 +типизация сервисов getUserPowerService;  
2.11.6 +типизация сервисов getUserResultsService;  
2.11.7 +типизация сервисов postEventService;  
2.11.8 +типизация сервисов getLogsAdmins;  
2.11.9 +типизация сервисов zwiftToken;  
2.11.10 +типизация сервисов getEvent;  
2.11.11 +типизация сервисов getEventsList;  
2.11.12 +типизация сервисов putEventService;  
2.11.13 +типизация сервисов putResultsService;  
2.11.14 +типизация сервисов getResultsService;  
2.11.15 +типизация сервисов resultsSeries;  
2.11.16 +типизация сервисов addCriticalPowers;  
2.11.17 +типизация сервисов handlerCatchUp;  
2.11.18 +типизация сервисов handlerClassicCommon,handlerNewbies;  
2.11.19 +первый запуск;  
2.11.20 +стабильная версия, устранены найденные баги после перевода на ts;  
2.11.21 +замена переменных из env на config;  
2.11.22 +перенос папки common c общими типами для backend и frontend в src;  
2.11.23 +изменился путь от сервера до index.html;  
2.11.24 +исправление бага при отображении иконки видимости райдеров в заезде;  
2.12.1 +фильтрация райдеров которыи используют VirtualPower;  
2.12.2 +исправление бага при отсутствии Leaders и Sweepers в заезде;  
2.13.1 +формирование и выбор сезона серии "Догонялок";  
2.14.1 +добавление в результаты отображение использования рулевого управления;  
2.14.2 +адаптив таблиц;  
2.14.3 +сортировка по возрастанию названий категорий в блоке категорий;  
2.14.4 +устранение бага с меню PopupMenuCP ;  
2.14.5 +font-weight:700 для отставаний которые меньше секунды в таблице результатов;  
2.14.6 +не показывать gap у дисквалифицированных;  
2.14.7 +исправление багов при сохранении fitfiles и criticalpower;  
2.15.1 +перенести все updates в другую программу;  
2.15.2 +удаление fifties которые старше 90 дней;  
2.15.3 +выделение результатов авторизованного юзера в таблицах;  
2.15.4 +исправления бага с подсчетом набора высоты в заезде;  
2.16.1 +логирование ошибок на сервере;  
2.16.2 +переименование папки asset в assets;  
2.16.3 +отображение полной таблицы с результатами для любых разрешений экрана;  
2.16.4 +отображение полной таблицы с результатами в профиле райдера для любых разрешений
экрана;  
2.16.5 +добавления hover на строках таблиц и caption для таблиц;  
2.16.6 +отображение полной таблицы с результатами в расписании и результатах эвентов;  
2.16.7 +отображение полной таблицы в series->catchup;  
2.17.1 +отображение правила "запрет руления";  
2.17.2 +модерация тэгов для Эвента. Добавление тэга (правила) "запрет руления";  
2.17.3 +исправление бага при переходе с schedule на results и обратно на schedule;  
2.17.4 +margin-top for pagination block;  
2.18.1 +сортировка результатов эвента по столбцам;  
2.18.2 +сброс сортировки на начальное значение при открытии страницы с результатами;  
2.19.1 +изменение описания Эвента с зарегистрированными райдерами;  
2.20.1 +добавление robot.txt и генерацию sitemap.xml;  
2.20.2 +исправление url до sitemap.xml;  
2.20.3 +исправление robot.txt;  
2.20.4 +первоначальное создание createSitemap после build server;  
2.20.5 +добавление lastmod к некоторым ссылкам в sitemap.xml;  
2.21.1 +статистика: график количества участвующий райдеров в Эвентах;  
2.21.2 +разделение страницы Статистика на компоненты;  
2.21.3 +изменения интервала опроса подтверждения email зарегистрированными пользователями;  
2.21.4 +закрыл в меню пункт отправки сообщений через бота;  
2.21.5 +в статистике линейный график заменён на бары;  
2.21.6 +группирование информации о количестве райдеров по месяцам;  
2.21.7 +формирование группирования информации о количестве райдеров по неделям;  
2.21.8 +формирование группирования информации о количестве райдеров по дням;  
2.21.9 +селектор выбора периода времени за который показывать информации о количестве райдеров в
Эвентах;  
2.21.10 +исправление вёрстки;  
2.22.1 +ленивая загрузка для некоторых страниц;  
2.22.2 +переименование компонентов, убрал слово Race, которое использовалось для отличия
нового/старого кода;  
2.22.3 +убрал отображение текстового спинера при ленивой загрузке компонентов;  
2.23.1 +диаграмма pie количество райдеров по типам заездов;  
2.23.2 +фильтрация диаграммы типы заездов по запрашиваемому периоду;  
2.23.3 +исправление бага отображения флага Казахстана;  
2.24.1 +создание createAsyncThunk для запроса и слайсов ZwiftEventParams;  
2.24.2 +выбор шаблона настроек для Эвента. Шаблон для Догонялок;  
2.24.3 +правка сообщения об ошибки при проверке подгрупп;  
2.24.4 +исправление багов в странице ZwiftAddEvent;  
2.24.5 +Шаблон для Серии;  
2.24.6 +Шаблон для newbies;  
2.24.7 +добавление параметра приватности (microserviceEventVisibility) в 3 шаблона: догонялки,
новичковая, серия;  
2.24.8 +фиксированная зависимость размера высоты от ширины Постера в карточке ближайших
заездов;  
2.24.9 +обновление данных Эвента в БД после внесения изменений в Эвент на сервере Звифт;  
2.25.1 +таблица максимальных результатов райдеров на интервалах. Серверная часть;  
2.25.2 +таблица максимальных результатов райдеров на интервалах. Фронэнд часть;  
2.25.3 +меню навигации по страницам статистики;  
2.25.4 +добавление 2,3 лидеров по мощностям;  
2.25.5 +исправление бага с активной иконкой "статистики" при открытии вложенной страницы
/race/statistics/;  
2.25.6 +стилизация страницы "лидеры по мощности";  
2.25.7 +замена иконки для страницы "Статистика";  
2.25.8 +исправление небольших багов;  
2.25.9 +добавление страниц Статистики в sitemap;  
2.25.10 +добавление isMale в документы коллекции PowerCurve;  
2.25.11 +корректировка ссылок в футере;  
2.25.12 +создание коллекции ZwiftRiders. Документ создается при первом результате Эвента в БД и
обновляется при каждом появлении следующего результата Эвента в БД;  
2.25.13 +таблица максимальных результатов райдеров на интервалах. Серверная часть. Женщины;  
2.25.14 +навигация межу страницами с лидерами мощности между мужчинами и женщинами;  
2.25.15 +удалил hook useBackground;  
2.25.16 +отображение статуса загрузки на пропущенных страницах в LoaderZ;  
2.25.17 +увеличение количества лидеров мощности до 10 райдеров;  
2.25.18 +выравнивание иконки female по высоте относительно текста;  
2.25.19 +вынес массив со значениями и названиями интервалов в отдельный модуль;  
2.25.20 +исключение из Лидеров мощности результатов полученных с VirtualPower;  
2.25.21 +сортировка зарегистрированных райдеров по имени;  
2.26.1 +перенес запрос изменения профиля в redux;  
2.26.2 +изменение url страницы профиля;  
2.26.3 +исправил бага с флагом Израиля;  
2.26.4 +увеличение паддингов для разрешений больше 1650;  
2.26.5 +привязка дополнительных аккаунтов Zwift к аккаунту на zwiftpower.ru;  
2.26.6 +привязка дополнительных аккаунтов Zwift к аккаунту на zwiftpower.ru Серверная часть;  
2.26.7 +привязка дополнительных аккаунтов Zwift к аккаунту на zwiftpower.ru FrontEnd;  
2.26.8 +блок работы с профилями из Звифта перенес в отдельный компонент;  
2.26.9 +мобильная верстка блока работы с профилями из Звифта;  
2.26.10 +исправление багов;  
2.26.11 +закрыл страницу настроек профиля для неавторизованных пользователей;  
2.26.12 +добавление данных Основного профиля Звифт в результаты Эвентов, показанных
Дополнительным профилем Звифта;  
2.26.13 +удаление данных Основного профиля Звифт из результатов Эвентов, показанных
Дополнительным профилем Звифта;  
2.26.14 +получение результатов райдера для профиля с результатами дополнительных профилей;  
2.26.15 +результаты райдера в Эвентах с подменой дополнительного профиля на основной;  
2.26.16 +исправил баг с весом и ростом из дополнительного профиля;  
2.26.17 +выделение строки в таблицах с результатом принадлежащим авторизованному пользователю;  
2.26.18 +изменение стиля hover в таблицах;  
2.26.19 +добавление данных Основного профиля Звифт в результаты Эвентов, показанных
Дополнительным профилем Звифта при обновлении результатов Эвента;  
2.26.20 +открыл папку logs для индексации в git;  
2.26.21 +исправление названия переменной powerCurveDB на powerCurvesDB;  
2.26.22 +исправление бага с пустым gap;  
2.26.23 +запрет на обновление результатов Эвента который старше недели;  
2.26.24 +обновление данных профилей райдеров из Звифта, принимавших участие в заездах, по
расписанию каждую ночь;  
2.26.25 +удаление активностей которые старше 90 дней из FitFiles;  
2.26.26 +удалил запуск removeActivityFromFitFile из основного модуля программы;  
2.26.27 +добавление данных страны и возраста в результаты райдеров при скачивании JSON;  
2.27.1 +подмена дополнительных профилей на основной в Лидерах мощности;  
2.27.2 +добавление данных в FAQ;  
2.27.3 +подмена данных дополнительного профиля на данные из основного в таблице результатов "Догонялок";  
2.28.1 +добавление данных CP(15,60,300,1200 секунд) в результаты Эвента для райдеров с закрытыми аккаунтами;  
2.28.2 +разбил update/results-event на несколько модулей;  
2.28.3 +разбил addCriticalPowers на несколько модулей;  
2.28.4 +убрал сортировку зарегистрированных райдеров по имени;  
2.28.5 +сортировка сначала по группам, затем по именам в группе для зарегистрированных райдеров. Реализованно на сервере;  
2.28.6 +добавил конфиги prettier для client и server;  
2.28.7 +утилита определения времени выполнения блока кода;  
2.28.8 +обновление PowerCurve райдеров при обновлении результатов Эвента;  
2.28.9 +быстрое обновление результатов Эвента: данные CP берутся из результатов ZwiftAPI. Обновление начинается после 30 минут после старта и длится 2.5 часа. Последнее обновление идет "полное" с сохранением активности в FitFiles и PowerCurve;  
2.28.10 +исправление бага с задвоением результатов;  
2.28.11 +прекращение автоматического быстрого обновления результатов Эвента после запроса на полное обновление результатов Эвента;  
2.28.12 +исправления бага при выборе типа обновления результатов;  
2.29.1 +оптимизация таблиц с результатами. Убрал подсказки (tooltip) при наведении с данных CriticalPower;  
2.29.2 +сброс стейта в редакс при размонтировании компонентов таблиц результатов и расписания Эвентов;  
2.29.3 +контроль обновления результатов;  
2.29.4 +исправление бага при регистрации при вводе занятого логина или e-mail;  
2.30.1 +диаграмма распределения участников по удельной мощности (frontend);  
2.30.2 +диаграмма распределения участников по удельной мощности (backend);  
2.30.3 +диаграмма распределения участников по удельной мощности полная реализация;  
2.30.4 +изменение стилей активных кнопок переключения между страницами;  
2.30.5 +изменение времени обновления результатов Эвента с 3х часов до 2х;  
2.30.6 +бары в диаграмме распределения участников по удельной мощности окрашены в цвет категории;  
2.30.7 +добавление страницы race/statistics/riders-ftp в sitemap;  
2.31.1 +перенес импорт переменных окружения в отдельный модуль;  
2.31.2 +добавление jestjs и файлов конфигурации;  
2.31.3 +исправление бага при отправке сообщения о неправильном логине или пароле при авторизации;  
2.32.1 +не регистрозависимый логин;  
2.32.2 +валидация логина;  
2.32.3 +изменение верски карточки Эвента на главной странице;  
2.32.4 +функция получение типа Эвента для отображения в карточке в отдельном модуле;  
2.33.1 +замена маршрутов, получаемых из библиотеки zwift-data, на данные с API Zwift;  
2.33.2 +удаление модуля getZwiftInsiderUrl;  
2.33.3 +добавление ссылок на описание маршрутов на сторонних ресурсах;  
2.33.4 +кнопка для регистрации в Эвент на сайте Zwift;  
2.33.5 +замена джерси, получаемых из библиотеки zwift-data, на данные с API Zwift;  
2.33.6 +изменение верстки блока подгрупп в описании Эвента;  
2.33.7 +исправление бага с заменой только одного пробела на дефис в названии маршрута;  
2.33.8 +небольшие изменения в вёрстке;  
2.34.1 +блок поиска и отображения Джерси из Zwift;  
2.34.2 +исправления бага в компоненте FaqJersey;  
2.34.3 +диаграммы помещены в контейнеры;  
2.35.1 +страница FAQ в "ленивой" загрузке;  
2.35.2 +диаграммы суммарного количества райдеров по категориям;  
2.35.3 +исправление бага при отображении флага Армении, Эстонии;  
2.36.1 +добавление данных для модерации результатов Эвента;
2.36.2 +страница внесения изменений в результаты;  
2.36.3 +чекбоксы для дисквалификации, редьюсер отправки запроса на API для дисквалификации;  
2.36.4 +реализация функциональности дисквалификации райдера на сервере;  
2.36.5 +изменение ранкинга после дисквалификации райдера для Catchup;  
2.36.6 +правильное отображение дисквалификации в таблице с результатами;  
2.36.7 +изменение ранкинга после дисквалификации райдера для ClassicCommon, Newbies;  
2.36.8 +исправление отображения DSQ в таблице результатов Эвента и на странице Профиля райдера; 
2.36.9 +добавление свойства eventId в FitFiles и PowerCurve;  
2.36.10 +чистка кода в leadersInIntervals.ts;  
2.36.11 +отображение иконки модификации заезда только для модераторов;  
2.36.12 +выравнивание по центру иконок в таблице результатов, ранкинге;  
2.36.13 +добавлена возможность выставлять гэпов старта групп с точностью до секунд;  
2.37.1 +данные маршрутов из библиотеки zwift-data;  
2.38.1 +в "Догонялках" при сохранении для райдеров группы "Е" дисквалификация с флагом "Участвовал вне зачёта". Изменение структуры модулей сохранения результатов "Догонялок";  
2.38.2 +модерация результата в "Догонялках": дисквалификация/снятие дисквалификации райдера;  
2.38.3 +исключил нереализованные типы заездов raceTypes;  
2.38.4 +документация: описание обновление результатов Эвента "Догонялок";  
2.38.5 +перенёс дисквалификацию с виртуальной мощностью в модуль filterByRankCatchup;  
2.38.6 +изменение структуры модулей сохранения результатов "Новичковая";  
2.38.7 +перенёс все обработчики результатов при обновлении в один модуль;  
2.38.8 +перенес временные периоды для обновлений результатов Эвента из checkDurationUpdating в updateResults;  
2.38.9 +отображение даты и времени модерации результатов Эвента на странице "Результаты заезда";  
2.39.1 +диаграмма распределения райдеров по возрастным категориям, серверная часть;  
2.39.2 +диаграмма распределения райдеров по возрастным категориям, клиентская часть;  
2.39.3 +исправления бага при отображении флага "Saint Pierre and Miquelon";  
2.39.4 +оптимизация получения данных для диаграммы "Количество райдеров в заездах";  
2.39.5 +смещение стрелки открытия окна для добавления zwiftId к аккаунту;  
2.40.1 +получение всех зарегистрированных пользователей;  
2.40.2 +таблица всех зарегистрированных пользователей;  
2.40.3 +открытие и закрытие некоторых страниц для модераторов;  
2.40.4 +перенес react.Suspense из роутев в MainLayer;  
2.40.5 +открытие некоторых страниц для модераторов;  
2.40.6 +обновление результатов после внесения изменений в результаты;  
2.40.7 +сброс данных results в stage при размонтировании компонета страницы результатов;  
2.40.8 +добавление описаний к некоторым модулям. Исправление переменной времени 2 часа в миллисекундах;  
2.40.9 +убрал catch с запроса на изменение параметров в zwift Api, чтобы ошибка возвращалась в контроллер и отправлялась пользователю;  
2.40.10 +добавлен организатор Эвентов - Bike-Caucasus;  
2.40.11 +закрытия модального окна изменения параметра Эвента (select) после выбора нужного значения; 
2.40.12 +плавное открытие/закрытие модального окна изменения параметра Эвента;  
2.40.13 +иконки на линки сторонних ресурсов описаний маршрутов;  
2.40.14 +добавлена ссылка на выбор велосипеда для маршрута 2019-uci-worlds-harrogate-circuit;  
2.40.15 +дробление большого сервиса eventPost на несколько модулей. Исправление бага с сохранением seriesId при добавлении нового Event в БД;  
