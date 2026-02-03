export const asideLayoutConfigs = [
  {
    paths: ['/'],
    showAside: true,
    includeChildren: false,
    widgets: ['poll', 'ongoingSeries', 'teamsRanking', 'donateBlock', 'siteInfo', 'devInfo'],
    ads: ['goprotect_1'],
  },

  {
    paths: [
      '/race/schedule',
      '/race/results',
      '/teams',
      '/organizers',
      '/series',
      '/race/statistics',
      '/riders',
      '/profile',
      '/streams',
      '/documentation',
    ],
    showAside: true,
    includeChildren: true,
    widgets: ['teamsRanking', 'ongoingSeries', 'donateBlock'],
    ads: ['goprotect_1'],
  },
  {
    paths: ['/zwift', '/organizer'],
    showAside: false,
    includeChildren: true,
    widgets: ['ongoingSeries'],
    ads: ['goprotect_1'],
  },
  {
    paths: ['/admin'],
    showAside: false,
    includeChildren: true,
    widgets: [],
    ads: [],
  },
];
