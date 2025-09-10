import IconDiagram from '../components/icons/IconDiagram';
import IconFaq from '../components/icons/IconFaq';
import IconHome from '../components/icons/IconHome';
import IconOrganizerPublic from '../components/icons/IconOrganizerPublic';
import IconProfile from '../components/icons/IconProfile';
import IconResults from '../components/icons/IconResults';
import IconRider2 from '../components/icons/IconRider2';
import IconSchedule from '../components/icons/IconSchedule';
import IconStream from '../components/icons/IconStream';
import IconTeam from '../components/icons/IconTeam';
import IconWorld from '../components/icons/IconWorld';

export const sidebarMainMenuItems = [
  { id: 0, to: '/', icon: IconHome, label: 'Домашняя' },
  { id: 1, to: '/race/schedule', icon: IconSchedule, label: 'Расписание' },
  { id: 2, to: '/race/results', icon: IconResults, label: 'Результаты' },
  { id: 3, to: '/teams', icon: IconTeam, label: 'Команды' },
  { id: 4, to: '/organizers', icon: IconOrganizerPublic, label: 'Организаторы' },
  { id: 5, to: '/series', icon: IconWorld, label: 'Серии заездов' },
  { id: 6, to: '/race/statistics/main', icon: IconDiagram, label: 'Статистика' },
  { id: 7, to: '/riders', icon: IconRider2, label: 'Райдеры' },
  { id: 8, to: '/profile', icon: IconProfile, label: 'Профиль' },
  { id: 9, to: '/streams', icon: IconStream, label: 'Трансляции' },
  { id: 10, to: '/faq', icon: IconFaq, label: 'ЧЗВ' },
];
