const db = require('../config/database');
const bcrypt = require('bcrypt');
const session = require('express-session');

const postRegister = async (req, res, next)=>{
    const {username, email, password} = req.body;

    const salt = bcrypt.genSaltSync(10);
    let passwordHansh = bcrypt.hashSync(password, salt);

    let findUser = `select * from user_rool where username = ?`;
    let findEmail = `select * from user_rool where email = ?`;

    let user_inf = {username: username, email: email, password: passwordHansh};

    let sql = `insert into user_rool set ?`;

    try {
        const dbConnect = await db;
        const [existUser] = await dbConnect.query(findUser, [username]);
        const [existEmail] = await dbConnect.query(findEmail, [email]);
        if(existUser.length > 0){
            return res.status(401).json('Username da ton tai');
        }
        if(existEmail.length > 0){
            return res.status(401).json('Email da duoc dung');
        }
        await dbConnect.query(sql, user_inf);
        res.redirect('/login');
        // res.json('Tao tai khoan thanh cong');
        
    } catch (err) {
        console.error(err);
        res.status(401).json('Dang ki that bai');
    }
};


// const postLogin = async (req, res, next)=>{
//     const {username, password} = req.body;

//     let sql = `select * from user_rool where username = ?`;

//     try {
//         const dbConnect = await db;
//         const [results] = await dbConnect.execute(sql, [username]);
//         if(results.length === 0){
//            return res.status(401).json('Nguoi dung khong ton tai');
//         }
//         const user = results[0];
//         const check = bcrypt.compareSync(password, user.password);
//         if (!check) { // Sửa điều kiện so sánh mật khẩu
//             return res.status(401).json('Sai mật khẩu');
//         }
//         req.session.user = {username: user.username};
//         console.log("User set in session:", req.session.user);

//         req.session.save(err=>{
//             if(err){
//                 console.error(err);
//                 res.redirect('/login');
//             }
//         })
//         console.log('Session saved successfully:', req.session);
//         res.redirect('/')
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json('Đăng nhập thất bại');
//     }
// }

const postLogin = async (req, res, next) => {
    const { username, password } = req.body;

    let sql = `SELECT * FROM user_rool WHERE username = ?`;

    try {
        const dbConnect = await db;
        const [results] = await dbConnect.execute(sql, [username]);
        if (results.length === 0) {
            return res.status(401).json('Người dùng không tồn tại');
        }
        const user = results[0];
        const check = bcrypt.compareSync(password, user.password);
        if (!check) {
            return res.status(401).json('Sai mật khẩu');
        }

        // Lưu userID và username vào phiên
        req.session.user = {
            userID: user.userID,
            username: user.username
        };

        console.log("User set in session:", req.session.user); // Kiểm tra user trong session

        req.session.save(err => {
            if (err) {
                console.error(err);
                return res.redirect('/login');
            }
            console.log('Session saved successfully:', req.session); // Kiểm tra lưu session
            res.redirect('/');
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json('Đăng nhập thất bại');
    }
};

module.exports = {postLogin, postRegister}