# Планирование разработки проекта для версии v2

2.90.1 +удалена сущность zwiftData из коллекции User. Изменена логика получения данных для профиля пользователя. Изменена логика получения и отображения профилей пользователей на странице модерации; 
2.90.2 +изменена логика получения данных для страницы Трансляций; 
2.90.3 +изменение сервиса по обновлению zwift-профилей всех райдеров по расписанию. Изменение сервиса обновления zwift-профиля пользователя по запросу; 
2.90.4 +удалён старого сервиса обновления zwiftData в профилях зарегистрированных пользователей;  
2.90.5 +изображения логотипа пользователя при авторизации их Rider коллекции; 
2.90.6 +обновление данных профиля на клиенте после запроса на обновления профиля с API Zwift;  
2.90.7 +баннер страницы Догонялок с результатами за сезон на страницы с результатами заездов Догонялок;  
2.90.8 +подсветка колонки CP в таблице результатов Эвента при наведении на соответствующую колонку;  
2.90.9 +подсветка колонки CP во всех таблицах, где есть CP при наведении на соответствующую колонку;  
2.90.10 +добавлена колонка racing score в таблицу результатов Эвента;  
2.90.11 +небольшие правки;  
2.90.12 +оптимизация получения данных для страниц статистика-Лидеры. Исправление багов на этих страницах;  
2.91.1 +Добавление в схему Фитфайла свойства banned, для исключения фитфайла в расчетах кривой мощности;  
2.91.2 +Исправление багов;  
2.91.3 +энд поинт, контроллер и сервис обновления состояния блокировки активности райдера в фитфайле;  
2.91.4 +базовые страницы для модерации пользователи, модерации активностей пользователя;  
2.91.5 +энд поинт, контроллер и сервис получения активностей райдера;  
2.91.6 +таблица с активностями райдера за последние 90 дней. Модерация блокировки активностей для исключения их данных в Кривой мощности и таблицах лидера;  
2.91.7 +сервис обновления данных кривой мощности и фитфайлов для зарегистрированного пользователя с привязанным zwiftId;  
2.91.8 +изменения в таблице пользователей для модерации;  
2.91.9 +изменена модерация фитфалов и кривой мощности с пользователя на райдера. Изменены сервисы, страницы модерации пользователей, добавлены страницы модерации райдеров;  
2.91.10 +сервис, контроллер для банна райдера (zwiftId) по списку причин;  
2.91.11 +таблица с баннами для райдера и их модерация. Обработчики редакса для получения и модерации баннов для райдеров;  
2.91.12 +фильтрация результатов CP райдеров с банном для рейтинговых таблиц;  
2.91.13 +переименование TableUsersActivities на TableRidersActivities;  
2.91.14 +добавление иконки управления райдерами в таблицы лидеров, результатов Эвента и в профиль райдера;  
2.91.15 +перенесена таблица управления блокировками райдера на отдельную страницу;  
2.91.16 +добавление стилей для кнопки обновления кривой мощности райдеров;  
2.91.17 +исправлены мелкие баги;  
2.91.18 +скрытие иконки входа на страницу модерации райдера не для админов сайта;  
2.92.19 +обновлена библиотека маршрутов и джерси;  
2.92.20 +добавление в коллекцию Rider документов райдеров, которые привязали zwiftId к профилю пользователя, но не участвовали в заездах;  
2.92.21 +изменения в таблице пользователей для модерации;  
2.92.22 +для райдеров с закрытым профиль отображение категории в виде знака вопроса;  
2.92.23 +для Новичкового заезда для групп свой рейтинг и отставания;  
2.92.24 +удаление обработчиков результатов для newbies заездов. Для newbies установлен обработчик для заездов с делением на группы;  
2.92.25 +для newbies заезда корректировка отображения результатов таблицы;  
2.92.26 +исправление мелких недочетов;  
2.92.27 +оптимизация обработчиков создания протоколов Эвента;  
2.92.28 +запрет установки/снятия дисквалификации результата с DNF или с VP;  
2.92.29 +изменена логика установки/снятия дисквалификации результата в эвенте catchup;  
2.92.30 +добавлен сервис получения каналов и трансляций с youtube пользователей с сайта;  
2.92.31 +изменена структура ответа на запрос о трансляциях твича. Структура сделана одинаковой для твича и ютуба. Изменены компоненты страницы трансляций в соответствии с новой структурой ответа.;  
2.92.32 +добавлен сервис обновления свойства профиля трансляции с youtube;  
2.92.33 +добавлен сервис и форма для изменения настроек трансляции youtube в профиле пользователя;  
2.92.34 +отображение каналов с трансляциями с yotube. Случайное перемешивание карточек каналов перед отображением;  
2.92.35 +оптимизация компонента карточки канала с трансляцией. Логика выбора данных в зависимости от платформы вынесена в отдельный хук;  
2.92.36 +добавление id видео трансляции с ютуб в объект трансляции, для формирования ссылки на трансляцию в клиенте;  
2.92.37 +для inputs если значение undefined то меняется на false;  
2.92.38 +удаление свойств twitch или youtube, если их вложенное свойство isEnabled: false;  
2.92.39 +изменение ссылки с главной страницы канала youtube на страницу трансляций;  
2.92.40 +добавление справки (описания) откуда брать информацию по названию канала в twitch, youtube;  
2.93.1 +добавлена таблица, отображающая лидеров по победам в каждой группе в Догонялках;  
2.93.2 +сервис получения данных по лидерам по победам в группах в Догонялках. Правки в таблице лидеров;  
2.93.3 +обновлены маршруты в БД;  
2.93.4 +исправлен баг с линками на профили райдеров из таблицы лидеров Догонялок;  
2.93.5 +в таблице лидеры по победам в группах поменяны местами столбцы: количество побед и райдер;  
2.93.6 +исправлен баг при подсчете дистанции и набора высоты на маршруте при создании/редактировании заезда;  
2.93.7 +на странице редактирования/создания эвента при изменении карты устанавливается маршрут с новой карты;  
2.94.1 +базовая страница управления организатором, навигация до страницы, иконка навигации для страницы;  
2.94.2 +обновлена схема и типы Организатора;  
2.94.3 +базовые страницы управления клубами организатора и ботом-модератором;  
2.94.4 +добавлен роутер, контроллер и сервис обработки запроса на обновление данных бота-модератора каналов Звифта;  
2.94.5 +добавлен роутер, контроллер и сервис получения сохраненных токенов для ботов-модераторов в клубах Звифта;  
2.94.6 +добавлена информационная карточка бота-модератора;  
2.94.7 +добавлена форма ввода логина/пароля бота-модератора для обновления токена доступа;  
2.94.8 +исправлен баг при получении ошибки при неправильном логине/пароле;  
2.94.9 +функциональность добавления нового бота-модератора при отсутствии ботов;  
2.94.10 +добавлен роутер, контролер и сервис удаления токена из бд;  
2.94.11 +небольшие правки;  
2.94.12 +добавлен роутер, контроллер и сервис получения данных клубов организатора;  
2.94.13 +добавлен роутер, контролер и сервис удаления клуба из бд;  
2.94.14 +добавлен слайс и редуктор для добавление клуба Организатору;  
2.94.15 +добавлен роутер, контролер и сервис добавления клуба в бд для Организатора;  
2.94.16 +сброс данных о клубе из хранилища редакс при размонтировании компонента;  
2.94.17 +добавлен слайс и редуктор для получения зарегистрированных пользователей их username и zwiftId по запросу модератора;  
2.94.18 +добавлен роутер, контролер и сервис для получения зарегистрированных пользователей их username и zwiftId по запросу модератора;  
2.94.19 +добавлен слайс и редуктор для добавления модератора в клуб;  
2.94.20 +добавлен роутер, контролер и сервис для добавления модератора в клуб;  
2.94.21 +добавлен слайс и редуктор для удаления пользователя из модераторов в клуб; 
2.94.22 +добавлен роутер, контролер и сервис для удаления пользователя из модераторов в клуб; 
2.94.23 +добавлена фитча удаления clubId из документа User пользователя из массива модераторов клуба при удалении соответствующего клуба; 
2.94.24 +небольшие правки; 
2.94.25 +для конфигурации accessExpressions для догонялок увеличен порог абсолютных ватт для Д категории с 160 до 200Вт; 
2.94.26 +добавлен роутер, контролер и сервис получения данных об Организаторе при запросе модератором и отображение названия Организатора на соответствующих страницах; 
2.94.27 +добавлены проверки при добавлении клуба организатору; 
2.95.1 +выделение отдельной виртуальной роли для модераторов клубов. Создана middleware для модераторов клубов. Маршруты для работы с Эвентами Звифта проходят проверку на модератора клубов; 
2.95.2 +добавлен роутер, контролер и сервис для получения данных клубов в которых пользователь является модератором. Открытие маршрута получения данных актуальных серий для модератора клубов; 
2.95.3 +открыт доступ к маршрутам управления Эвентами для модератора клубов; 
2.95.4 +создан компонент для элемента бокового меню навигации по страницам; 
2.95.5 +создан middleware для проверки, что пользователь является модератором. Для модератора клубов открыты соответствующи иконки для модерации в списке эвентов и в описании эвента; 
2.95.6 +для модератора клубов открыта иконка для модерации в списке результатов эвентов; 
2.95.7 +создание документа rider для привязываемых zwiftid к профилю пользователя у которых нет результатов в БД; 
2.95.8 +изменена структура входных параметров для функций запросов на ZwiftAPI; 
2.95.9 +добавлена ссылка на документ Organizer в схему ZwiftEventSchema для получения token доступа к ZwiftAPI для последующий работы с ZwiftEvent;  
2.95.10 +обновление результатов Эвента с использованием токена доступа к ZwiftAPI соответствующего организатора;  
2.95.11 +создание Эвента в Звифте только через ключ Организатора;  
2.95.12 +добавление id организатора в объект Эвента при добавлении Эвента в БД;  
2.95.13 +проверка доступа к добавлению Эвента в БД перенесена в контроллер из сервиса;  
2.95.14 +обновление параметров Эвента с использованием токена доступа к ZwiftAPI соответствующего организатора;  
2.95.15 +использование токена доступа Организатора для получения/обновления putSignedRidersService зарегистрированных райдеров;  
2.95.16 +использование токена доступа Организатора для модуля getEventZwiftService;  
2.95.17 +убран второй общий бот для модерации Эвентов в клубах;  
2.95.18 +добавлен заголовок к форме поиска клуба по id;  
2.95.19 +все функции работы с токенами доступа собраны в одном модуле;  
2.95.20 +изменение порога мощности для группы Д;  
2.95.21 +AES-шифрование для токена доступа в БД;  
2.95.22 +исправлены баги связанные с дешифрацией токенов доступа;  
2.95.23 +сервис, контроллер и маршрут для получения данных организаторов в клубах которых пользователь является модератором;  
2.95.24 +изменение структуры запроса получения данных Эвента для просмотра/редактирования;  
2.95.25 +исправлен баг при запросе эвента на его редактирование или добавление;  
2.95.26 +исправлены баги при создании Эвента и добавлении его на сайт;  
2.95.27 +условная отрисовка соответствующих форм на странице Добавления и поиска Эвента;  
2.95.28 +отдельный маршрут, контролер, сервис и slice (на клиенте) для страницы Редактирование Эвента;  
2.95.29 +небольшие изменения в стилизации некоторых элементов;  
2.95.30 +исправлен баг при удалении токена организатора: удалялся первый токен в БД;  
2.95.31 +небольшие изменения в стилизации некоторых элементов. Изменены названия в шапке таблицы добавления клубов Организатором;
2.95.32 +обработка ошибок в запросах pots, put на Zwift API, дополнительная информация если токен невалидный. Обработка ошибок для контроллеров сделана в отдельном модуле. Новый обработчик добавлен для контроллеров создания и обновления Эвентов.
2.95.33 +переименование функции логирования ошибок с errorHandler на handleAndLogError.
2.95.34 +исправлен баг, когда не сбрасывались данные из хранилища при размонтировании страницы просмотра данных Эвента.
2.95.35 +добавлены подсказки на страницах добавления, редактирования и просмотра заездов в Звифте. Уточнены основные положения работы с заездами Звифта через сайт zwiftpower.ru  
2.95.36 +изменены стили расположения таблиц на странице Догонялок;  
2.95.37 +при запросе на Zwift API передача описания ошибки на клиент;  
2.95.38 +исправлен баг при обновлении профиля райдера;  
2.95.39 +скрытие блока с барами мощности для профиля при отсутствии данных по CP;  
2.95.40 +добавление пункта NON_REGULAR_PARTICIPANT для блокировки райдера в рейтинговых таблица;  
2.95.41 +исправлен баг при доступе организатора к закрытым страницам сайта;  
2.96.1 +добавлен базовый сервис регистрации через VK ID;  
2.96.2 +отправка токинов доступа на бэкэнд для регистрации нового пользователя;  
2.96.3 +сервис, контролер и маршрут регистрации через VK ID;  
2.96.4 +сохранение данных регистрации в хранилище редакс после успешной регистрации на сервере;  
2.96.5 +новый вариант авторизации через VK ID и создание документа токена авторизации на серверной части;  
2.96.6 +хуки получения информации об устройстве и локации для токена доступа при регистрации;  
2.96.7 +исправлены баги с куками при регистрации через VK ID;  
2.96.8 +аутентификация через VK ID на стороне клиента;  
2.96.9 +аутентификация через VK ID на серверной стороне;  
2.96.10 +изменение статус кода на 200 об ошибке при запросе на обновление ключа доступа и данных пользователя для клиента;  
2.96.11 +перенаправление со страницы колбэк vk на домашнюю;  
2.96.12 +перенаправление на домашнюю страницу в случае успешной аутентификации;  
2.96.13 +изменение стилизации меню регистрации и аутентификации на сайте;  
2.96.14 +изменение стилизации меню регистрации и аутентификации на сайте;  
2.96.15 +добавлены страницы настроек профиля для аккаунта, привязки звифта аккаунта, трансляций, оповещений;  
2.96.16 +форма изменения username пользователя на клиенте;  
2.96.17 +сервис, контроллер, маршрут для изменения username пользователя на клиенте;  
2.96.18 +изменение названия свойства токена доступа, который храниться в локальном хранилище браузера;  
2.96.19 +изменен сервис, контролер регистрации через логин/пароль с добавлением deviceInfo и locations;  
2.96.20 +исправлен баг при привязки аккаунтов Звифта к аккаунту на сайте;  
2.96.21 +изменена логика аутентификации через логин/пароль. Добавились deviceInfo, location новая схема токена авторизации;  
2.96.22 +название refreshToken изменено на название с привязкой к сайту _zp;  
2.96.23 +возвращение и установка токена доступа при регистрации/авторизации через VK ID;  
2.96.24 +рефакторинг кода сервисов авторизации;  
2.96.25 +добавлены блоки аутентификаций информации и привязки к аккаунту;  
2.96.26 +сервис, контроллер, маршрутизатор обработки функциональности привязки сервиса аутентификации VKID к аккаунту пользователя;  
2.96.27 +убраны id, email из VK ID пользователя, которые отправлялись на клиент;  
2.96.28 +изменена стилизация страницы регистрации и аутентификации;  
2.96.29 +добавлена проверка, при привязке VK ID к аккаунту, наличие такого VK ID у других пользователей;  
2.96.30 +рефакторинг кода страницы привязки аккаунта Zwift к аккаунту сайта;  
2.96.31 +устранён баг в сервисе обновления токена доступа;  
2.96.32 +использование react-hook-form для изменения username в настройках аккаунта;  
2.96.33 +изменён accessExpressions для группы Б для catchup заездов;  
2.97.1 +добавлена страница Политика конфиденциальности;  
2.97.2 +добавлена страница Пользовательское соглашение;  
2.97.3 +добавлены в футер ссылки на страницы Политика конфиденциальности, Пользовательское соглашение;  
2.97.4 +добавлено предупреждение о Политике конфиденциальности, Пользовательском соглашении на страницы аутентификации и регистрации;  
2.97.5 +Изменена кнопка Настройки в профиле пользователя на ЛК;  
2.97.6 +Небольшие правки;  
2.97.7 +исправлен адрес сервера на переменную из env;  
2.97.8 +небольшие правки;  
2.97.9 +исправлена ссылка на форму Согласия;  
2.97.10 +в бланке письма для пользователей исправлена ссылка на управление оповещениями;  
2.97.11 +исправлен баг в диапазонах строгой категоризации по удельной мощности;  
2.97.12 +изменены диапазоны строгой категоризации для догонялок и тура;  
2.97.13 +добавлен выбор стартовых карманов для маршрута из корректных значений стартовых карманов для данного маршрута;  
2.97.14 +небольшие правки;  
2.97.15 +исправлен баг с расстоянием до старта круга;  
2.97.16 +исправлен баг с постоянным отображением снэкбара при переключении между страницами;  
2.97.17 +добавлен блок отображение сервисов трансляций которые подключил пользователь в профиле;  
2.97.18 +добавлены нерабочие методы для yandex oauth;  
2.97.19 +исправлен баг при открытии аккаунта пользователя, который подвязал аккаунт Звифта к профилю на zp.ru;  
2.97.20 +исправлен баг при отображении иконки твича в настройках трансляций;  
2.97.21 +изменены название пунктов выбора типа видимости райдеров в Эвенте;  
2.97.22 +небольшие правки;  
2.97.23 +изменен файл robot.txt;  
2.98.1 +страницы: организаторы заездов, организатор заездов и роутеры к ним. Карточка организатора;  
2.98.2 +сервис, контролер, маршрут для обработки запросов на получения данных организаторов и организатора;  
2.98.3 +добавлена urlSlug для страницы организатора;  
2.98.4 +мелкие правки;  
2.98.5 +добавлена иконка организаторов на левую панель управления;  
2.98.6 +слайс получение данных списка организаторов заезда. Отображение карточек организаторов;  
2.98.7 +слайс получение данных организатора заезда;  
2.98.8 +генерация title и description для страниц организаторов и организатора. Добавлены страницы в sitemap;  
2.99.1 +изменено название формы создания организатора админом. Копирована форма (компонент) для редактирования данных организатора;  
2.99.2 +добавлены базовые поля формы для ввода данных Организатора;  
2.99.3 +слайс получения главных данных Организатора и его клубов. Доработан сервис формирования этих данных  на сервере;  
2.99.4 +исправлен баг при билдинге клиентской части;  
2.99.5 +сохранение измененных данных Организатора в БД, кроме файлов изображений;  
2.99.6 +удалена папка node_modules из индекса git;  
2.99.7 +сервис сохранения файлов изображений организатора в облаке vk;  
2.99.8 +сервис оптимизации изображений, сохраняемых в облаке;  
2.99.9 +исправлен баг с удалением старых файлов с облака;  
2.99.10 +формирования объекта ссылок на оптимизированные изображения для клиента;  
2.99.11 +компонент адаптивного изображения;  
2.99.12 +загрузка оптимизированных изображений в облако сохранением оригинальных соотношений сторон. Добавлена блокировка полей ввода данных при отправки данных на сервер;  
2.99.13 +исправлены мелкие баги;  
2.99.14 +исправлен баг удаления данных организатора при переключении между дочерними страницами;  
2.99.15 +небольшие правки;  
2.99.16 +добавлено дополнительное поле в сущность организатора - Цель организатора;  
2.99.17 +добавлена библиотека для автоматического изменения высоты textarea;  
2.99.18 +верстка хедера для страницы организатора;  
2.99.19 +добавлены рекламные блоки на страницы организаторов;  
2.99.20 +небольшие правки;  
2.99.21 +исправлены мелкие баги;  
2.99.22 +исправлены мелкие баги при создании Организатора заездов админом;  
2.99.23 +исправлены баги с типизацией ответов с БД монго;  
2.99.24 +исправлены баги метатегами для страниц организаторов;  
2.99.25 +исправлены баги метатегами для страниц организаторов;  
2.99.26 +исправлены баги метатегами для страниц организаторов при формировании ссылки на изображение для opengraph;  
2.99.27 +исправлен мелкий баг;  
2.99.28 +переход по глубокой ссылке в компаньон;  
2.99.29 +изменена стилизация лого организатора;  
2.99.30 +изменена стилизация превью-карточки заезда;  
2.99.31 +добавлен логотип организатора на карточку Эвента;  
2.99.32 +изменён компонент на основе принципа разделения интерфейса;  
2.99.33 +добавлен заголовок и описание для каждой группы в описании Эвента;  
2.99.34 +удалён console.log() из компонента;  
2.99.35 +добавлено поле ввода url ВКонтакте для организатора;  
2.99.36 +добавлена кнопка ВКонтакте для организатора;  
2.99.37 +исправлен баг при отображении параметров заезда в карточке Эвента;  
2.99.38 +добавлены полезные ссылки в подвал сайта;  
2.99.39 +в форму добавления данных организатора добавлена функция подсветки блока на котором находится фокус;  
2.99.40 +исправлен баг при создании эвента и добавлении его на сайт;  
2.99.41 +изменен стиль отображения логотипа организатора на карточке Эвента;  
2.100.1 +отображение вида письма-оповещения, отсылаемого пользователям сайта;  
2.100.2 +добавлено отображение стрелки для элемента select;  
2.100.3 +исправлен баг при отображении стрелки для элемента select в браузере firefox;  
2.100.4 +улучшена анимация открытия блока с описанием организатора;  
2.100.5 +добавлена навигационная панель на страницу Организатора;  
2.100.6 +исправление маршрутов для страницы результаты заездов организатора;  
2.100.7 +убрана навигационная панель со страницы Организатора. Исправлены мелкие баги с отображением select в браузере firefox;  
2.100.8 +созданы скрытый, продублированный блок с текстом описания и миссией Организатора для SEO оптимизации;  
2.100.9 +удалён созданы скрытый, продублированный блок;  
2.100.10 +исправлен баг при попытке сохранить измененный Эвент "duplicate_tags";  
2.100.11 +исправлено описание базовых настроек строгой категоризации. Изменен eventTemplateId на 100";  
2.100.12 +исправлено описание базовых настроек строгой категоризации;  
2.100.13 +отображение описания строгой категоризации в виде таблицы;  
2.100.14 +добавлена реклама https://www.goprotect.ru на главную страницу;  
2.100.15 +добавлена строгая категоризация со стандартными диапазонами и дополнительной группой А+;  
2.100.16 +исправлена неточность с логическим выражением для строгой категоризаци для категории А;  
2.100.17 +расширена логика отображения баннеров оповещения;  
2.100.18 +добавлен рекламный баннеров оповещения для организаторов заездов;  
2.100.19 +изменён текст баннера оповещения для трансляций. Исправлен баг в карточке трансляций;  
2.100.20 +исправлен баг отображения баннера оповещения при перерисовки компонента;  
2.100.21 +исправлен баг с отображением цели организатора в карточке организатора;  
2.100.22 +добавлена случайная последовательность отображения карточек организаторов;  
2.100.23 +изменение логики отображения рекламного блока на главной странице для мобильной версии;  
2.100.24 +исправлен мелкий баг;  
2.100.25 +изменен диапазон для А+ в настройках defaultAndAPlus;  
2.100.26 +добавлен сервис, контроллер, маршрут для формирования данных по предстоящим Эвентам для рассылки на e-mail. Изменен метод get на post маршрут формирования предварительного просмотра информационного письма;  
2.100.27 +добавлена иконка очищения поля ввода слова для фильтрации таблицы;  
2.100.28 +добавлен поиск эвента по названию и короткому названию организатора;  
2.100.29 +добавлена функциональность обновления обновления данных клуба Организатором и админом сайта;  
2.100.30 +добавлен фильтр поиска для таблицы расписания предстоящих заездов;  
2.100.31 +исправлен баг при отображении длинного названия Эвента;  
2.100.32 +добавлено сохранение строки фильтра в локальном хранилище для таблиц расписания и результатов Эвентов;  
2.100.33 +ключи для хранения данных в локальном хранилище изменены с добавлением префикса сайта для страниц расписания и результатов заездов;  
2.100.34 +добавлен блок донатов;  
2.100.35 +добавлена кнопка донатов от бусти;  
2.100.36 +добавлена иконка Z для блока донатов;  
2.100.37 +исправлен баг со строкой поиска на странице Райдеры;  
2.100.38 +исправлена ссылка для бусти;  
2.101.1 +добавлена схема и модель с описанием типов для таблиц начисления очков в сериях;
2.101.2 +добавлены схемы и модели с описанием типов для серии и для алгоритмов расчета сводных таблиц;
2.101.3 +добавлены базовые сервисы, контроллеры, маршруты по сериям;
2.101.4 +изменил сервисы и контроллеры для работы с сущностью Серия с функций на классы;  
2.101.5 +базовый контролер и десериализация данных для создания Серии заездов;  
2.101.6 +базовая страница создания/редактирования Серии заездов;  
2.101.7 +базовые страницы списка, создания, редактирования Серий заездов;  
2.101.8 +добавлен сервис, контролер, маршрут получение эвентов Организатора, которые можно добавить в серию. Добавлена базовая форма создания серии;  
2.101.9 +исправлены баги при получении эвентов для серии заездов;  
2.101.10 +добавлен компонент отображения этапов в Серии;  
2.101.11 +десериализация и сохранение данных Серии в БД кроме изображений;  
2.101.12 +добавлено сохранение изображений в облаке;  
2.101.13 +закончены основные работы фо функциональности создания Серии заездов;  
2.101.14 +исправлены баги с хранилищем редакс. Перенесены маршруты работы организатора с сериями из /series в /organizer/series;  
2.101.15 +сервис, контролер, маршрут получения данных всех серий организатора;  
2.101.16 +Базовый сервис, контролер, маршрут удаления серии заездов. Редуктор удаления серии заездов;  
2.101.17 +обновлены данные по маршрутам и джерси;  
2.101.18 +добавлен сервис удаления серии заездов;  
2.101.19 +небольшие правки;  
2.101.20 +исправлены баги при получении данных этапов;  
2.101.21 +завершены все работы по функциональности редактирования Серии заездов;  
2.102.1 +сервис, контроллер, маршрут получения серий заездов. Карточка серии заездов;  
2.102.2 +добавлен маршрут и базовая страница Серии заездов;  
2.102.3 +добавлен редуктор получения данных Серии заездов с сервер;  
2.102.4 +сервис, контролер, маршрут получения данных Серии заездов;  
2.102.5 +добавлен хеадер-постер для страницы серии заездов;  
2.102.6 +добавлены базовые страницы результатов, регламента для серии заездов;  
2.102.7 +исправление багов;  
2.102.8 +добавлена страница описании серии заездов;  
2.102.9 +исправлен баг с отображением поля Призы в Серии;  
2.102.10 +исправлен все найденные недочеты;  
2.102.11 +микро разметка для страниц расписание этапов и регламент серии через Helmet;  
2.102.12 +исправление мелких багов;  
2.102.13 +в sitemap добавлена динамическая генерация страниц страниц расписание этапов и регламент серии;  
2.102.14 +добавлены атрибуты открытия в новом окне ссылки через тэг <a> в методе объекта createHtml;  
2.102.15 +добавлена генерация метатегов SSR для страниц серии;  
2.102.16 +исправление багов при генерации title на страницах серии;  
2.102.17 +добавлен фильтр названия организатора KOMon для формирования генеральной таблицы по серии заездов Догонялки;  
2.103.1 +добавлена схема и модель для конфигурации финишного протокола для организаторов;  
2.103.2 +базовые страницы для редактирования пакетов конфигурации финишного протокола;  
2.103.3 +форма заполнения конфигурации финишного протокола;  
2.103.4 +добавлен запрос всех организаторов для селекта;  
2.103.5 +сервис, контроллер, маршрут для создания имени конфигурации финишного протокола;  
2.103.6 +сервис, контроллер, маршрут для обновления данных конфигурации финишного протокола;  
2.103.7 +редукторы для обновления конфигурации финишного протокола. Редуктор для получения всех конфигураций финишных протоколов;  
2.103.8 +сервис, контроллер, маршрут для получения всех конфигураций финишных протоколов;  
2.103.9 +страница редактирование данных конфигурации финишных протоколов;  
2.103.10 +сервис и редуктор удаления конфигурации финишного протокола;  
2.103.11 +исправлен баг при удаленном эвенте из БД, но сохраненной ссылкой на него в этапах серии;  
2.103.12 +добавлены даты начала и завершения серии в карточку серии;  
2.103.13 +запрос данных по конфигурациям протоколов с БД и формирование массива options из этих данных для страницы редактирования Эвента;  
2.103.14 +убран блок отображения типа заезда(конфигурации финишного протокола);  
2.104.1 +для догонялок сформирована структура данных серии, аналогичная стандартным сериям;  
2.104.2 +добавлены базовые компоненты отображения результатов серии для разных типов серий;  
2.104.3 +отображение результатов и сводных таблиц серии Догонялок;  
2.104.4 +удалены старые сервисы, контролеры и маршруты по догонялкам;  
2.104.5 +удалены ссылки на race/series из sitemap и метатэгов;  
2.104.6 +добавлен функционал выбора типа серии заезда при создании и редактировании серии;  
2.104.7 +список серий заездов на странице Организатора;  
2.104.8 +уменьшен размер шрифта для h1 страниц;  
2.105.1 +добавлено меню для переключения между закладками редактирования серии заездов и редактирование этапов серии заездов;  
2.105.2 +удалены реализации добавления этапов при создании или редактировании серии заездов;  
2.105.3 +исправление бага доступа к обновлению данных клуба с ZwiftAPI;  
2.105.4 +исправление бага доступа к данным конфигурации финишных протоколов;  
2.105.5 +исправлен отступ от шаки до меню на страница организатора - серии;  
2.105.6 +добавлены метатеги для страницы результаты серии заездов;  
2.105.7 +добавлены дополнительные свойства в схему Этап серии;  
2.106.1 +форма для добавления/удаления и редактирования этапов серии заездов;  
2.106.2 +добавлена функция добавления/удаления этапов серии заездов;  
2.106.3 +добавлен сервис, контроллер, маршрут для добавления/удаления этапов Серии заездов;  
2.106.4 +небольшие правки;  
2.106.5 +добавлен сервис, контроллер, маршрут для изменение параметров этапов Серии заездов;  
2.106.6 +изменён порог А+ с 4.8 до 4.6вт/кг в пакете стандартных настроек и А+;  
2.106.7 +добавлены и закомментированы строки добавления женских категорий для группы E, D. Исправлен баг на страницы организатора-серии заездов;  
2.106.8 +карточка этапа Серии заездов для контроля данных;  
2.106.9 +добавлены форма редактирования параметров Этапа в серии.;  
2.106.10 +добавлено окно подтверждения при удалении этапа из Серии;  
2.106.11 +добавлен компонент Заголовок с градиентной линией подчеркивания;  
2.106.12 +оптимизация отображения серий заездов и обновление заголовков;  
2.106.13 +добавлена иконка 'Видны все райдеры на данной карте';  
2.106.14 +исправлены баги по метатегам на нескольких страницах;  
2.106.15 +исправлены баги по метатегам на нескольких страницах;  
2.106.16 +небольшие правки;  
2.106.17 +рекламный блок любой страницы заменен на рекламный блок серии заездов;  
2.106.18 +в результатах заезда создается динамическая реклама на серю заездов из которой текущий заезд;  
2.107.1 +схема, модель и тип для результата заезда в этапе серии;  
2.107.2 +уточнения для схемы результата заезда в этапе серии;  
2.107.3 +добавлен конфиг строгой категоризации для etalon;  
2.107.4 +небольшие правки;  


----
-в результатах заезда сделать рекламный постер с соответствующей серий откуда заезд. Из сервера получать urlSlug серии вместе с результатами заезда и подставлять в рекламный компонент серии; 
-routerAdmin.put('/clubs', authOrganizer, updateClub); проверить если проверка, что редатирует организатор, который добавлял редактируемый клуб;  
-при удалении эвента удалять его данные из этапа в серии(если он где-то был); 
-заменить названия переменных с finishProtocol на configFP так как это конфиги, а не протоколы;  
-добавить { timestamps: true } в схему NSeries;  
-сделать продвинутое логирование действий модераторов по всем сущностям;
-сделать продвинутое логирование ошибок: входные параметры, ответ, важность(minor, major);  
-CardRacePreview сделать Link внутри карточки, и не использовать useNavigate;  
-установить всем изображением width, height в тэг img;  
-переименовать getTimerLocal в getLocalTime;  
-до старта 00:00 изменять на старт был в карточке Эвента;  
-после создания серии не очищаются файлы изображений в форме;  
-сделать привязку/отвязку эвента к серии в форме редактирования параметров Эвента;  
-перед созданием Серии с этапами проверять этапы, нет ли у них привязки к другим сериям;  
-в сервис getEventsForSeriesService добавить в параметр запроса на получение эвентов started:false, чтобы получить только не стартовавшие Эвенты;  
-баг при отображении стартовых гэпов в описании эвентов. Исправить логику расчета гэпов, на данный момент идёт проверка на наличие секунд в стартовом времени, что в некоторых случаях ведёт к багам;  
-переименовать все переменные в локальном хранилище с префиксом zp_;  
-добавить контроль длины названия эвента "name size must be between 1 and 140";  
-обновление результатов Эвента вынести в модуль zp-update;
-заменить backgroundImage на posterSrc в метатегах;
-в saveAuthToken надо ли проверять, есть ли токен с таким же authService и deviceId. То есть при регистрации уже кто то авторизовался с этого же компьютера и этого браузера, но userId другой!  
-после привязки zwiftId возвращать с сервера zwiftId в данных для авторизации на клиенте. 
-проверь необходимость сохранять данные в токене доступа в текущем варианте, например, данные из VK ID;   
-TokenSchema два одинаковых типа, проверить какой лишний. Дать семантическое название.
-убрать forView: forViewBoolean, из модуля, перенести в родительский компонент;  
-в /zwift/event/view просматриваются через общий токен, значит для закрытых Эвентов просмотр будет невозможен;  
-убрать расчет категории getProfileService так как category из профиля нигде не используется?, а используется только zCategory;  
-сделать проверку наличия бота у организатора с отображением предупреждения если такого нет.
-почистить слайсы, редукторы, маршруты, контроллеры, сервисы для работы с клубами через админа, так как все сделано через модераторов;
-filterByRankCatchup проверить необходимость использования в handlerCatchUpModified, так как в обработчиках других результатов он не используется.  
-что будет при запросе на обновления райдера которого нет в Rider или в других данных в БД.  
-не отправляется ошибка на клиент в updateFitFileAndPowerCurveService если случилась внутри модулях данной функции.  
-проработать логику при привязки zwiftId к профилю пользователя и дополнительных zwiftId.
-баг: в заезде 4354504 при выставлении classicGroup Vasily Suchkov(A) присваивается нулевое место??
-сделать оповещение при генерации большого количества ошибок на сервере;  
-сделать оповещение при генерации большого количества запросов на APIZwift;  
-обновлять данные райдера после получения результатов заезда?;  
-убрать перезагрузку страницы при обновлении данных эвента (расписание);  
-запрет на внесение изменений данных Эвента если пользователь не является модератором в Клубе;  
-переделать FormRequest под универсальные редюсеры;  
-очистка redis раз в сутки, принудительная очистка redis по запросу админа;  
-сделать из двух preparation создания и изменения Эвентов один общий;  
-main banner перенести в мобильной версии под карточку первого Эвента;  
-в баннере для десктоп отключить видео рекламу. Сделать отдельный банер для мобильной версии, видео рекламу оставить;  
-для баров, показывающих ватты и уд.ватты в профиле сделать анимацию огня и красного цвета при 100% заполнении соответствующего бара;  
-навести порядок с resetFilterCategory, многие сбрасываются при монтировании компонента, а не при размонтировании;  
-определение категории при регистрации в Эвент и после получения результата в Эвенте;
-ошибка после сохранения изменений в Эвенте, который не добавлен на сайт 
-обработка ошибки при сохранении изменений с новыми лидерами Эвента "not.member.of.external.resource";  
-сделать универсальным компонент FindZwiftProfileNew;  
-сохранение powerCurve для райдеров с закрытыми профилями в Звифте;  
-что будет если сменить основной профиль при дополнительных. Поставить запрет на смену основного
при наличии дополнительных?;  
-{ zwiftIdAdditional: [] }, убрать появление пустых массивов;  
-ZwiftProfileSchema проверить реализацию, когда обновляется и где запрашивается. Создавалась для
уменьшения и оптимизации запросов с ZwiftAPI;  
 -переделать компоненты навигации с использованием модулей navActive;  
-очищать данные из фитфайла активностей которые старше 90 дней???;  
-LeadersInIntervals исключать результаты дисквалифицированных и с ВиртуалПауэр;  
-сделать тесты на getWeek;  
-выделение столбца по которому ведется сортировка;  
-проработать объект описывающий дисквалификации и нарушения;  
-перенести в редакс стейты при пагинации;  

-перенести все окна confirms в хуки;  
-сделать сервис для загрузки и хранения изображений для заездов в Звифте;  
-очистка singedEiders у которых нет привязки к eventSubgroup (документы по какой то причине не
удалились);  
-добавить HOC для отображения блоков для админов(модераторов);  
-сделать "хлебные крошки";  
-как сделать общими файлы asset для fronta и backenda(например описание логов );  
привет


я отошёл от дел уже, моя схема уже неэффективна (подкручивают гайки звифт), а каждую неделю неохота активировать, лучше делать самостоятельно:
годовой план в ЛК открываете zwift.com/join, там плат. данные вбиваете, катаете неделю, потом обновляете
Плат. данные можно найти в тг каналах всяких, например t.me/ATIK_TIPS_TRICK (пробовать нужно, где BIN и 4 цифры в конце только надо сгенерировать), генератор https://www.aimtuto.com/p/cc-bin-generator.html


5156240253017431|07|2026|154
5156240253014040|07|2026|082
5156240253013026|07|2026|703
5156240253014370|07|2026|865
5156240253011269|07|2026|554
5156240253015856|07|2026|405
5156240253012549|07|2026|031
5156240253012085|07|2026|330
5156240253018785|07|2026|585
5156240253010469|07|2026|202
5156240253012473|07|2026|010
5156240253017845|07|2026|082
5156240253011160|07|2026|831
5156240253018348|07|2026|767
5156240253010824|07|2026|208
5156240253018579|07|2026|787

вот, например, были рабочие, это адреса нужно вбивать UAE (арабские эмираты). Генерировать можно по 515624025301xxxx
Генератор адресов тоже найти можно, либо вбивать Dubai и индекс 00000