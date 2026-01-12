import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  fetchPostSeriesOrganizer,
  fetchPutSeriesOrganizer,
} from '../redux/features/api/series/fetchSeries';
import { serializeOrganizerSeriesCreate } from '../utils/serialization/organizer-data';
import { getAlert } from '../redux/features/alertMessageSlice';

/**
 * Хук для формы создания/редактирования данных серий заездов.
 * @param {{
 *    isCreating:boolean;
 *    seriesId:string;
 *    reset:any;
 *    logoUrls:any;
 *    posterUrls:any;
 * }} param0
 * @returns
 */
export function useFormOrganizerSeries({
  isCreating,
  seriesId,
  reset,
  setTrigger,
  logoUrls,
  posterUrls,
}) {
  const [resetImage, setResetImage] = useState(false);
  // Статус загрузки текущей формы на сервер.
  const [loadingForm, setLoadingForm] = useState(false);

  // Ссылка на лого Организатора. Используется в форме редактирования, для отображения изображения с сервера.
  const [logoSrcState, setLogoSrcState] = useState(logoUrls?.original);

  // Ссылка на постер Организатора. Используется в форме редактирования, для отображения изображения с сервера.
  const [posterSrcState, setPosterSrcState] = useState(posterUrls?.small);

  const dispatch = useDispatch();

  // Обработчик отправки формы на сервер.
  const onSubmit = async (formData) => {
    try {
      setLoadingForm(true);
      // console.log(stagesAdded);

      // Сериализация данных перед отправкой на сервер.
      const serializedSeriesData = serializeOrganizerSeriesCreate({
        ...formData,
        ...(!isCreating && { seriesId }),
      });

      const fetchHandler = isCreating ? fetchPostSeriesOrganizer : fetchPutSeriesOrganizer;

      // .unwrap() возвращает промис, для работы с async/await
      const data = await dispatch(fetchHandler(serializedSeriesData)).unwrap();

      // Успешный результат.
      dispatch(getAlert({ message: data.message, type: 'success', isOpened: true }));

      if (isCreating) {
        // Очистка полей формы
        reset();
        setResetImage((p) => !p);
        setLogoSrcState(null);
        setPosterSrcState(null);
      } else {
        // Триггер запускает запрос на получение обновлённых данных.
        setTrigger((prev) => !prev);
      }
    } catch (error) {
      console.log(error); // eslint-disable-line
    } finally {
      setLoadingForm(false);
    }
  };

  return {
    onSubmit,
    resetImage,
    loadingForm,
    logoSrcState,
    posterSrcState,
    setLogoSrcState,
    setPosterSrcState,
  };
}
