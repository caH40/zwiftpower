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

---

-добавить на страницу описание догонялок, картинку;  
-фильтр для таблиц, выбор количества отображаемых строк в таблице; -результаты на сегментах;
-оптимизировать модули по обработке даты, несколько модулей с похожими функциями;

-перенести все окна confirms в хуки;  
-сделать сервис для загрузки и хранения изображений для заездов в Звифте;  
-очистка singedEiders у которых нет привязки к eventSubgroup (документы по какой то причине не
удалились);  
-сделать кнопку генерации токена. Если токен "протух" автоматически генерировать новый;  
-!!!количество финишировавших считается количеству в Звифте, не учитывается ручное добавление
результата;  
-ручное добавление результатов заезда;  
-добавить HOC для отображения блоков для админов(модераторов);  
-сортировка таблиц;  
-сделать "хлебные крошки";  
-засунуть сервер в webpack;  
-засунуть сервер в eslint; -при обновлении результатов заезда изменять параметр
totalFinishedCount;  
-если компонент не универсальный, то добавлять принадлежность в имя компонента; -добавить ссылки
на роуты в описание эвента;