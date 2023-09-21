import { getTimerLocal } from '../../../utils/date-local';

export const getCaption = (result) => {
  if (!result) {
    return '';
  }
  const riderName = `${result.profileData.firstName} ${result.profileData.lastName}`;
  const caption = `Результаты заездов ${riderName}`;

  return caption;
};
