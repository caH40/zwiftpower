import IconCategoryEnforced from '../components/icons/IconCategoryEnforced';
import IconDD from '../components/icons/IconDD';
import IconHeartMonitor from '../components/icons/IconHeartMonitor';
import IconLateJoin from '../components/icons/IconLateJoin';
import IconPowerMeter from '../components/icons/IconPowerMeter';
import IconPowerUp from '../components/icons/IconPowerUp';
import IconRubberBanding from '../components/icons/IconRubberBanding';
import IconShowResults from '../components/icons/IconShowResults';
import IconSteeringDisabled from '../components/icons/IconSteeringDisabled';
import IconTT from '../components/icons/IconTT';
import IconTTLock from '../components/icons/IconTTLock';
import IconTTT from '../components/icons/IconTTT';
import IconViewEvent from '../components/icons/IconViewEvent';
import IconViewGroup from '../components/icons/IconViewGroup';

export const iconsDescriptions = [
  {
    id: 0,
    icon: IconShowResults,
    description: 'показывать таблицу результатов на финише заезда',
  },
  {
    id: 1,
    icon: IconCategoryEnforced,
    description:
      'включена строгая категоризация (category Enforcement). Категорию выставляет Звифт. Зайти можно в свою группу или более высокую. Райдеры без категории могут присоединиться только к группе "E"',
  },
  { id: 2, icon: IconPowerUp, description: 'Отключены в заезде PowerUp' },
  { id: 3, icon: IconViewEvent, description: 'Видны все участники заезда' },
  { id: 4, icon: IconViewGroup, description: 'Видны только участники группы' },
  { id: 5, icon: IconSteeringDisabled, description: 'Отключено рулевое управление' },
  { id: 6, icon: IconTT, description: 'Драфтинг отключен' },
  {
    id: 7,
    icon: IconTTLock,
    description: 'Запрет выбора велосипедов для раздельного старта (TT)',
  },
  {
    id: 8,
    icon: IconPowerMeter,
    description:
      'Обязательное наличие станка с измерителем мощности (запрет использования станков с z-power)',
  },
  {
    id: 9,
    icon: IconHeartMonitor,
    description: 'Обязательное наличия монитора сердечного ритма',
  },
  { id: 10, icon: IconDD, description: 'Двойной драфтинг' },
  {
    id: 11,
    icon: IconRubberBanding,
    description:
      'Группа удерживается вместе невидимой резиновой лентой, так что райдеры с разным уровнем подготовки смогут ехать одной группой',
  },
  {
    id: 12,
    icon: IconLateJoin,
    description:
      'Позднее подключение. Возможность подключиться к заезду в течении 30 минут после старта',
  },
  { id: 13, icon: IconTTT, description: 'Включен драфт для ТТ велосипедов. Team Time Trial' },
];

export const racesDescription = [
  { id: 0, label: 'CT', showLabel: true, text: 'Классическая гонка без групп' },
  { id: 1, label: 'CG', showLabel: true, text: 'Классическая гонка с разделением по группам' },
  { id: 2, label: 'CU', showLabel: true, text: 'Догонялки' },
  { id: 3, label: 'NE', showLabel: true, text: 'Заезд для новичков, для групп "C", "D"' },
  { id: 4, label: 'TT', showLabel: true, text: 'Заезд с раздельным стартом' },
  { id: 5, label: 'CR', showLabel: true, text: 'Критериум' },
  { id: 6, label: 'LR', showLabel: true, text: 'Заезд на длинную дистанцию (объем)' },
];
