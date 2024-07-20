const db = require('../config/database');
const session = require('express-session');
const  {postDelete} = require('../services/CRUD')
const listTask = async(req, res)=>{
    const dbConnect = await db;
    const userID = req.session.user.userID;
    console.log(userID);
    const {taskname, due_date, status, id} = req.body;
    let[results, fields] = await dbConnect.query(
        `insert into form (taskname, due_date, status, userID)
        values (?,?,?,?)`,
        [taskname, due_date, status, userID]
    )
    res.redirect('/');
}


const postUpdate = async (req, res)=>{
    const dbConnect = await db;
    // const userID = req.session.user.userID;
    const {taskname, due_date, status, id} = req.body;
    const [results,fields] = await dbConnect.query(
        `update form set taskname = ?, due_date = ?, status = ? where id = ?`,
        [taskname, due_date, status, id]
    );
    res.redirect('/');
}


const postDeleted = async(req, res)=>{
    const id = req.body.id;
    postDelete(id);
    res.redirect('/');
}


module.exports = {
    listTask,
    postUpdate,
    postDeleted
}


