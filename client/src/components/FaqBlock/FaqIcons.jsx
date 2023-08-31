import React from 'react';

import IconCategoryEnforced from '../icons/IconCategoryEnforced';
import IconShowResults from '../icons/IconShowResults';
import IconPowerUp from '../icons/IconPowerUp';
import IconViewEvent from '../icons/IconViewEvent';
import IconViewGroup from '../icons/IconViewGroup';
import IconTT from '../icons/IconTT';
import IconTTLock from '../icons/IconTTLock';
import IconPowerMeter from '../icons/IconPowerMeter';
import IconHeartMonitor from '../icons/IconHeartMonitor';
import IconDD from '../icons/IconDD';
import IconRubberBanding from '../icons/IconRubberBanding';
import IconLateJoin from '../icons/IconLateJoin';

import IconDescription from './IconDescription';

import styles from './FaqBlock.module.css';

function FaqIcons() {
  return (
    <div className={styles.block}>
      <h3 className={styles.title}>Иконки и аббревиатуры</h3>
      <h4 className={styles.title__h4}>Правила в заездах:</h4>
      <IconDescription Icon={IconShowResults}>
        показывать таблицу результатов при финишировании в заезде
      </IconDescription>
      <IconDescription Icon={IconCategoryEnforced}>
        включена строгая категоризация (category Enforcement). Категорию выставляет Звифт. Зайти
        можно в свою группу или более высокую. Райдеры без категории могут присоединиться только
        к группе "E"
      </IconDescription>
      <IconDescription Icon={IconPowerUp}>Отключены в заезде PowerUp</IconDescription>
      <IconDescription Icon={IconViewEvent}>Видны все участники заезда</IconDescription>
      <IconDescription Icon={IconViewGroup}>
        Видны только участники своей группы
      </IconDescription>

      <IconDescription Icon={IconTT}>Драфтинг отключен</IconDescription>
      <IconDescription Icon={IconTTLock}>
        Запрет выбора велосипедов для раздельного старта (TT)
      </IconDescription>
      <IconDescription Icon={IconPowerMeter}>
        Обязательное наличие станка с измерителем мощности (запрет использования станков с
        z-power)
      </IconDescription>
      <IconDescription Icon={IconHeartMonitor}>
        Обязательное наличия монитора сердечного ритма
      </IconDescription>
      <IconDescription Icon={IconDD}>Двойной драфтинг</IconDescription>
      <IconDescription Icon={IconRubberBanding}>
        Группа удерживается вместе невидимой резиновой лентой, так что райдеры с разным уровнем
        подготовки смогут ехать одной группой
      </IconDescription>
      <IconDescription Icon={IconLateJoin}>
        Позднее подключение. Возможность подключиться к заезду в течении 30 минут после старта
      </IconDescription>
    </div>
  );
}

export default FaqIcons;
