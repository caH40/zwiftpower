import { useDispatch } from 'react-redux';

import { timeDetailsToMilliseconds } from '../utils/date-convert';
import { getAlert } from '../redux/features/alertMessageSlice';
import { fetchPostStageResultInSeries } from '../redux/features/api/series/fetchEditSeriesResults';
import { resetZwiftProfile } from '../redux/features/api/zwiftProfiles/zwiftProfileSlice';
import { fetchGetStageResults } from '../redux/features/api/series/fetchSeries';
import { closePopupFormContainer } from '../redux/features/popupFormContainerSlice';

export function useAddStageResult({
  setIsLoading,
  zwiftProfile,
  seriesId,
  stageOrder,
  urlSlug,
}) {
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    const durationInMilliseconds = timeDetailsToMilliseconds(formData.time);

    if (durationInMilliseconds <= 0) {
      dispatch(
        getAlert({
          message: 'Финишное время должно быть больше 0!',
          type: 'error',
          isOpened: true,
        })
      );
      return;
    }

    if (!zwiftProfile?.id) {
      dispatch(
        getAlert({
          message: 'Нет данных по райдеру!',
          type: 'error',
          isOpened: true,
        })
      );
      return;
    }

    setIsLoading(true);

    const profileData = {
      firstName: formData.profileData.firstName,
      lastName: formData.profileData.lastName,
      gender: formData.profileData.gender === 'мужчина' ? 'male' : 'female',
      weightInGrams: Number(formData.profileData.weight) * 1000,
      heightInCentimeters: Number(formData.profileData.heightInCentimeters),
      age: Number(formData.profileData.age),
      imageSrc: zwiftProfile.imageSrc,
      countryAlpha3: zwiftProfile.countryAlpha3,
    };

    try {
      const response = await dispatch(
        fetchPostStageResultInSeries({
          category: formData.category,
          subgroupLabel: formData.subgroupLabel,
          durationInMilliseconds,
          heartRateData: Number(formData.heartRateData),
          avgWatts: Number(formData.avgWatts),
          seriesId,
          stageOrder: Number(stageOrder),
          profileId: zwiftProfile.id,
          ...profileData,
        })
      ).unwrap();

      // Успешный результат.
      dispatch(resetZwiftProfile());
      dispatch(getAlert({ message: response.message, type: 'success', isOpened: true }));
      dispatch(fetchGetStageResults({ urlSlug, stageOrder }));
      dispatch(closePopupFormContainer());
    } catch (error) {
      console.error(error); // eslint-disable-line
    } finally {
      setIsLoading(false);
    }
  };

  return onSubmit;
}
