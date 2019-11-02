module.exports = appInfo => {
  const config = {};

  config.serverUrl = 'http://training-beta.test.seewo.com/school-api';


  config.authUrl = 'http://id-dev.test.seewo.com';

  config.mockApiUrl = 'http://swqa.gz.cvte.cn/swapi/v1/mock/SWXG/school-api';

  config.redis = {
    client:{
      host: 'sr-test-redis-master-1.gz.cvte.cn',
      port: 6379,
      prefix: 'xg-session:',
      password: '',
      db: '0',
    }
  };

  config.fridayAppId = '05c2c703685a3d99863fc5aa26bcf210';

  return config;
};