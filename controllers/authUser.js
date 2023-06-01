const Users = require ('../models/usersModel');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const config = require('../config/authConfig');

// const getUsers = async(req, res) => {
//     try {
//         const users = await Users.findAll({
//             attributes:['id','name','email']
//         });
//         res.json(users);
//     } catch (error) {
//         console.log(error);
//     }
// }

//function register
const Register = async(req, res) => {
    const { name, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({        //'Users' dari model
            name: name,             //ambil dari name yang di kirim dari req.body
            email: email,
            password: hashPassword  
        });
        res.json({msg: "Register Berhasil"});
    } catch (error) {
        console.log(error);         //parsing error
    }
}

//function login
const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);    //single data makanya pakai index ke 0
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Email tidak ditemukan"});
    }
}

// //function logout
// export const Logout = async(req, res) => {
//     const refreshToken = req.refreshToken;

//     if(!refreshToken) return res.sendStatus(204);
//     const user = await Users.findAll({
//         where:{
//             refresh_token: refreshToken
//         }
//     });

//     if(!user[0]) return res.sendStatus(204);
//     const userId = user[0].id;
//     await Users.update({refresh_token: null},{
//         where:{
//             id: userId
//         }
//     });
//     return res.sendStatus(200);
// }

module.exports = {
    Register,
    Login
};