export const resultClear = {
  stageId: '',
  name: '',
  zwiftId: 0,
  time: 0,
  weightInGrams: 0,
  watt: 0,
  wattPerKg: 0,
  heightInCentimeters: 0,
  avgHeartRate: 0,
  category: 'C',
  categoryCurrent: '',
  imageSrc: '',
  gender: 'мужской',
  DNF: 'нет',
};

export const getScroll = (element) => {
  const scrollTarget = element;
  const topOffset = 70;
  const elementPosition = scrollTarget.getBoundingClientRect().top;
  const offsetPosition = elementPosition - topOffset;
  window.scrollBy({
    top: offsetPosition,
    behavior: 'smooth',
  });
};

export const resultStart = (stageId, rider) => ({
  stageId,
  name: rider.firstNameZwift ? `${rider.firstNameZwift} ${rider.lastNameZwift}` : '',
  zwiftId: rider.zwiftId || '',
  time: '',
  weightInGrams: '',
  watt: '',
  wattPerKg: '',
  heightInCentimeters: rider.heightInCentimeters || '',
  avgHeartRate: '',
  category: rider.category || '',
  categoryCurrent: '',
  imageSrc: rider.imageSrc || '',
  gender: rider.gender || '',
  DNF: 'нет',
});

export const checkForm = (result) => {
  if (
    result.stageId === '' ||
    result.name === '' ||
    result.zwiftId === '' ||
    result.time === '' ||
    // result.weightInGrams === '' ||
    result.watt === '' ||
    result.wattPerKg === '' ||
    result.heightInCentimeters === '' ||
    result.avgHeartRate === '' ||
    result.category === '' ||
    result.categoryCurrent === '' ||
    result.gender === ''
  )
    return { isCorrect: false, message: 'Не все поля заполнены' };

  if (
    !(
      /^[0-9][0-9]:[0-9][0-9]:[0-9][0-9]$/.test(result.time) ||
      /^[0-9][0-9]:[0-9][0-9]$/.test(result.time)
    )
  )
    return { isCorrect: false, message: 'Неверный формат времени!' };

  return { isCorrect: true };
};
