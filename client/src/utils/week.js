/**
 * Получение номера недели в году
 * Первой неделей считается та, где есть первый четверг года.
 */
// порядковый номер недели начиная с 1 (единицы)
export const getWeek = (time) => {
  const firstOfJanuary = new Date(new Date(time).getFullYear(), 0, 1);

  // задержка в днях в зависимости на какой промежуток недели попадает 1 января
  // понедельник-четверг, значит счет недель с 1го января
  // пятница-воскресенье, значит счет недель с со следующей недели
  let delay = 0;

  // номер дня недели начинается с понедельника, понедельник = 1
  const dayInWeek = (date) => {
    const isSunday = new Date(date).getDay() === 0;
    return isSunday ? 7 : new Date(date).getDay() + 1;
  };

  const dayFirstOfJanuary = dayInWeek(firstOfJanuary);

  if (dayFirstOfJanuary > 0 && dayFirstOfJanuary < 5) {
    delay = dayFirstOfJanuary;
  } else {
    // вычитается количество дней "застрявших" в нумерации недель в прошлом году
    // пятница =3,суббота =2, воскресенье =1
    delay = -(8 - dayFirstOfJanuary);
  }

  // количество дней с первого января
  const daysQuantity = Math.ceil((new Date(time) - firstOfJanuary) / 86400000);

  return Math.ceil((daysQuantity + delay) / 7);
};
