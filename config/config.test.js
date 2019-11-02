module.exports = appInfo => {
  const config = {};

  config.serverUrl = 'https://training.test.seewo.com/school-api';

  config.authUrl = 'https://id.test.seewo.com';

  config.redis = {
    client:{
      host: 'sr-test-redis-master-1.gz.cvte.cn',
      port: 6379,
      prefix: 'xg-session:',
      password: '',
      db: '0',
    }
  };

  config.fridayAppId = '65054a889196f24c94b23c3ab28bf87d';

  return config;
};

