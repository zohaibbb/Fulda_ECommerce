const host = process.env.DB_HOST || 'localhost';

module.exports = {
  server: {
    port: 3000
  },
  database: {
    url: `mongodb://admin:admin123@ds057000.mlab.com:57000/fuldabuysell`,
    properties: {
      useMongoClient: true
    }
  },
  key: {
    privateKey: '37LvDSm4XvjYOh9Y',
    tokenExpireInMinutes: 1440
  },
  pagination: {
    defaultPage: 1,
    defaultLimit: 10
  }
};
