const path = require('path');

exports.keys = 'eggfirstkey';

exports.middleware = ['auth', 'locals', 'notFoundHandler'];

exports.view = {
  defaultViewEngine: 'ejs',
  mapping: {
    '.ejs': 'ejs',
  },
};

exports.port = 8080;

exports.session = {
  key: 'connect.magick',
  maxAge: 86400000,
  httpOnly: true,
  renew: true
}

exports.redis = {
  client: {
    host: 'redis-master-5.gz.cvte.cn',
    port: 6383,
    prefix: 'xg-session:',
    password: '',
    db: '0',
  }
};


// 安全配置
exports.security = {
  csrf: {
    headerName: 'x-csrf-token',
  },
  xframe: {
    enable: false
  }
};

exports.static = {
  prefix: '/statics/',
  dir: path.join(__dirname, '../', './build/statics')
};
