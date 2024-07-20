const session = require('express-session');
const {getTask, getUpdate} = require('../services/CRUD');
// const home = async (req, res)=>{
//     const user = req.session.user;
//     console.log(user);
//     const results = await getTask();
//     res.render('home.ejs',  {user, listTask: results});
// }

const home = async (req, res) => {
    if (!req.session.user || !req.session.user.userID) {
        console.log('User session data is missing, redirecting to login');
        return res.redirect('/login');
    }

    const userID = req.session.user.userID;
    console.log("User session data on home:", req.session.userID);
    console.log("UserID:", userID);

    try {
        const results = await getTask(userID);
        res.render('home', { user: req.session.user, listTask: results });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


const login = (req, res)=>{
    res.render('login.ejs');
}

const register = (req, res)=>{
    res.render('register.ejs');
}

const create = (req, res)=>{
    const user = req.session.user;
    res.render('addTask.ejs', {user});
}

const edit = async (req, res)=>{
    const user = req.session.user;
    const taskID = req.params.id;
    const task = await getUpdate(taskID)
    res.render('edit.ejs', {user, tasknameupdate: task});
}

const deleted = async (req, res)=>{
    const user = req.session.user;
    const taskID = req.params.id;
    const task = await getUpdate(taskID);
    res.render('delete.ejs', {user, tasknameupdate: task});
}

const logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Failed to logout.');
        }

        res.clearCookie('connect.sid'); // Clear the cookie
        // return res.status(200).send('Logout successful.');
        res.redirect('/');
    });
};
module.exports = {home, login, register, create, edit, logout, deleted};