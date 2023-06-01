const express = require ("express");
const router = express.Router();
const {verifyRegister} = require('../middlewares');
const {authValidator} = require('../validators');
const controller = require('../controllers/authUser');

const db = require('../config/databaseConfig');

module.exports = (app) => {
    app.use((req, res, next) => {
      res.header(
        'Access-Control-Allow-Headers',
        'Authorization, Origin, Content-Type, Accept',
      );
      next();
    });

    router.post(
      '/register',
      verifyRegister.checkDuplicateEmail(db.user),
      authValidator.register,
      controller.register(db.user),
    );
  
    router.post(
      '/login',
      authValidator.login,
      controller.login(db.user),
    );

    app.use('/api/auth', router);
};

module.exports = router;