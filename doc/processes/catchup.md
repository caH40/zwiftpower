## Суммарные таблица результатов серии заездов "Догонялки"

В модели TotalCatchup берется дата начала и завершения серии.  
Для этого промежутка времени из базы запрашиваются результат первого места в каждом заезде.
Суммируются результаты выигрышей по группам, к данным добавляются результаты ручного добавления
из модели TotalCatchup.