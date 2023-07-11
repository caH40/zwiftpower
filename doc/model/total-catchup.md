## Описание модели TotalCatchup.js

### Редактируемая таблица суммарных результатов серии (catchup)

**start** - (`Number`) дата старта;  
**end** - (`Number`) дата финиша серии;  
**update** -(`Object`) обновления таблицы:

        - user - (`ObjectId`) id юзера, вносившего результат;
        - update - (`Number`) дата изменялась таблицы;

вносился результат;

**manual** -(`Array`) ручное добавление победного места:

      (`Object`)

        - dateStart - (`Number`) дата состоявшегося заезда;
        - winnerCategory - (`String`) выигравшая группа ['A','B','C'];
        - update - (`Object`) добавление результата:

            - user - (`ObjectId`) id юзера, вносившего результат;
            - data - (`Number`) дата ;
