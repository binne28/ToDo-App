const db = require('../config/database');

const getTask = async (userID) => {
    const dbConnect = await db;
    let [results, fields] = await dbConnect.query('SELECT * FROM form WHERE userID = ?', [userID]);
    console.log(userID);
    return results;
};

const getUpdate  = async(taskID)=>{
    const dbConnect = await db;
    const [results,fields] = await dbConnect.query(
        'select * from form where id = ?', [taskID]
    )
    const task = results && results.length > 0 ? results[0]:{};
    return task;
}


const postDelete = async(taskID)=>{
    const dbConnect  = await db;
    const [results, fields] = await dbConnect.query(
        `delete from form where id = ?`, [taskID]
    );
}

module.exports = {
    getTask, getUpdate, postDelete
}