import { serverFront } from '../../../config/environment';
import IconTelegram from '../../icons/IconTelegram';

export const mapSite = [
  { id: 0, name: 'Анонсы ближайших заездов', href: serverFront },
  { id: 1, name: 'Расписание всех заездов', href: `${serverFront}/race/schedule` },
  { id: 2, name: 'Результаты заездов', href: `${serverFront}/race/results` },
  { id: 3, name: 'Организаторы заездов', href: `${serverFront}/organizers` },
  { id: 4, name: 'Серии заездов', href: `${serverFront}/series` },
  { id: 5, name: 'Статистика', href: `${serverFront}/race/statistics/main` },
  { id: 6, name: 'Лидеры мощности', href: `${serverFront}/race/statistics/leaders/male` },
  { id: 7, name: 'Райдеры по FTP', href: `${serverFront}/race/statistics/riders-ftp` },
  { id: 8, name: 'Трансляции', href: `${serverFront}/streams` },
  { id: 9, name: 'Поиск райдера', href: `${serverFront}/riders` },
  { id: 10, name: 'Часто задаваемые вопросы', href: `${serverFront}/faq` },
  { id: 11, name: 'Сервисы сайта', href: `${serverFront}/site-services` },
];

export const usefulLinks = [
  { id: 0, name: 'zwiftpower.com', href: 'https://zwiftpower.com' },
  { id: 1, name: 'zwifterbikes.com', href: 'https://zwifterbikes.web.app/' },
  { id: 2, name: 'whatsonzwift.com', href: 'https://whatsonzwift.com' },
  { id: 3, name: 'zwiftinsider.com', href: 'https://zwiftinsider.com' },
  { id: 4, name: 'zwifthub.com', href: 'https://zwifthub.com' },
  { id: 5, name: 'zwiftgopher.com', href: 'https://zwiftgopher.com' },
];

export const documentsLegal = [
  { id: 0, name: 'Политика конфиденциальности', href: `${serverFront}/legal/privacy-policy` },
  { id: 1, name: 'Пользовательское соглашение', href: `${serverFront}/legal/terms-of-use` },
  { id: 2, name: 'Публичная оферта', href: `${serverFront}/legal/offer` },
];

export const usefulLinksWithIcon = [
  {
    id: 0,
    name: 'KOM-on группа',
    href: 'https://t.me/komon_zwift',
    icon: <IconTelegram squareSize={20} />,
  },
  {
    id: 1,
    name: 'KOM-on info',
    href: 'https://t.me/komon_race_info',
    icon: <IconTelegram squareSize={20} />,
  },
  {
    id: 2,
    name: 'Zwift MTBtraining',
    href: 'https://t.me/ZwiftMTBtraining',
    icon: <IconTelegram squareSize={20} />,
  },
  {
    id: 3,
    name: 'ETALON team',
    href: 'https://t.me/etalonteam',
    icon: <IconTelegram squareSize={20} />,
  },
];
