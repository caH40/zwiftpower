import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames/bind';

import { convertBytesTo } from '../../utils/convert-bytes';
import { getAlert } from '../../redux/features/alertMessageSlice';
import InputFileIcon from '../UI/InputFile/InputFileIcon';
import ButtonClose from '../UI/ButtonClose/ButtonClose';
import IconQuestion from '../icons/IconQuestion';

import styles from './BlockUploadImage.module.css';

const cx = cn.bind(styles);

const noImage = '/images/icons/noimage.svg';

/**
 * Блок для загрузки Титульного изображения для новости
 * Устанавливает в setPoster данные типа File, показывает загруженное изображения для контроля
 */
export default function BlockUploadImage({
  title,
  poster,
  setPoster,
  isLoading,
  resetTrigger,
  posterUrl,
  setPosterUrl,
  isSquare,
  validationText,
  tooltip,
  accept,
}) {
  const [imageTitle, setImageTitle] = useState(noImage);

  const dispatch = useDispatch();

  // Сброс отображаемого изображения после отправки формы.
  useEffect(() => {
    setImageTitle(noImage);
  }, [resetTrigger]);

  // обработка загрузки изображения
  const getPictures = async (event) => {
    const file = event.target.files?.[0] || null;

    if (!file) {
      return;
    }

    // проверка на максимальный разрешенный размер загружаемого файла
    const maxSizeFileInMBytes = 7;
    const sizeFileInMBytes = convertBytesTo(file.size, 'mB');
    if (sizeFileInMBytes > maxSizeFileInMBytes) {
      dispatch(
        getAlert({
          message: `Размер файла не должен превышать ${maxSizeFileInMBytes} МБайт`,
          type: 'error',
          isOpened: true,
        })
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      if (e.target && typeof e.target.result === 'string') {
        const dataUrl = e.target.result;

        // установка Data URL (base64) для отображения загруженного изображения
        setImageTitle(dataUrl);

        // установка изображения File в poster для дальнейшей работы с ним
        setPosterUrl(null);
        setPoster(file);
      }
    };
    reader.readAsDataURL(file);
  };

  // удаление загруженного изображения
  const deleteImage = () => {
    setImageTitle(noImage);
    setPoster(null);
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>
        <div className={styles.box__info}>
          {title}
          {tooltip && <IconQuestion squareSize={20} tooltip={tooltip} />}
        </div>
      </h2>

      <div className={styles.box__control}>
        <InputFileIcon
          name="uploadImage"
          icon={{
            width: 26,
            height: 22,
            src: '/images/icons/image-upload.svg',
            alt: 'Upload image',
          }}
          accept={accept}
          getChange={getPictures}
          loading={isLoading}
          disabled={imageTitle !== noImage}
        />

        <span className={styles.validate}>{validationText}</span>
      </div>

      <div className={cx('relative', { square: isSquare })}>
        {/* в данном случае компонент Image не нужен */}
        <img
          src={posterUrl || imageTitle}
          alt="title image"
          className={cx('img', { img__error: !!validationText })}
          width={400}
          height={300}
        />

        {poster && (
          <>
            <ButtonClose getClick={deleteImage} />
            <div className={styles.top} />
          </>
        )}
      </div>
    </section>
  );
}
