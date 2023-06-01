const jwt = require ('jsonwebtoken');
const config = require('../config/authConfig')

//fungsion verifyToken
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];       //jika user tidak mengirimkan tokennya maka variabel token juga akan kosong, jika user mengirimkan tokennya maka kita akan spit dan ambil tokennya 
    
    if (authType !== 'Bearer') {
        return res.status(403).send({
          error: true,
          message: 'Invalid token!',
        });
    }
    
    if (!token) {
        return res.status(403).send({
          error: true,
          message: 'No token provided!',
        });
    }
    
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                error: true,
                message: 'Unauthorized!',
            });
        }
        req.userId = decoded.id;
        next();
    });
};
    
const authJwt = {
    verifyToken,
};

module.exports = authJwt;