const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/viewEngine');
const web = require('./routers/webRouter');
const webUser = require('./routers/auth');
const listTask = require('./routers/task');
const session = require('express-session');

const port = 8080;



const app = express();
config(app);
// app.use(setUser);

app.use(session({
    secret: 'bigcar',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Đặt thành false nếu bạn không sử dụng HTTPS
         // Thời gian sống của cookie (60 giây)
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.get('/get', (req, res)=>{
    res.send(req.session.user ? `User: ${req.session.user.username}`: 'No logged in');
})

app.use('/', web);
app.use('/auth', webUser);
app.use('/task', listTask);

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
})