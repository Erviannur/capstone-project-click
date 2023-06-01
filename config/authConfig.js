const env = require('../utils/utilsEnv');

module.exports = {
  secret: env('JWT_SECRET'),
};