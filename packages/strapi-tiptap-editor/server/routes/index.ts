export default [
  {
    method: 'GET',
    path: '/',
    handler: 'settingsController.index',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'PUT',
    path: '/update-settings',
    handler: 'settingsController.updateSettings',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
];
