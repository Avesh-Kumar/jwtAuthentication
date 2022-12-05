const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser= require('cookie-parser');
const { Employee } = require('./db')
const empModel = require('./employeeModel/dal')
const ejs = require('ejs')
const mongoose = require('mongoose');
const key = "my name is avesh kumarjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjdssadsdwdf";
mongoose.connect("mongodb+srv://AveshKumar:AveshKumar33@cluster0.jbyq6le.mongodb.net/company?retryWrites=true&w=majority")
    .then((e) => console.log('my visual studio is connect with mongodb atlas'))
    .catch((e) => console.log(e));
var app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set("views", __dirname);
app.set("view engine", "ejs");

app.get('/exist', (req, res) => {
    res.render("home", { title: "employee already exist" });
});
app.get('/save', (req, res) => {
    res.render("home", { title: "employee register successfully" });
});
app.get('/loginsuccess', (req, res) => {
    res.render("home", { title: "employee login success" });
});
app.get('/jwtverify', (req, res) => {
    res.render("home", { title: "employee verify success" });
});
app.get('/loginfail', (req, res) => {
    res.render("home", { title: "you are not register person" })
})
app.get('/', (req, res) => {
    res.render("home", { title: "welcome to JWT authentication" });
})

app.get('/register', (req, res) => {
    res.render('register', { title: "welcome to registration form" })
})
app.get('/login', (req, res) => {
    res.render('login', { title: "welcome to log-in page" });
});

app.get('/user',async (req, res) => {
    //jwt.verify(req.token, key);
    const token =  req.headers.authorization;
     await jwt.verify(token, key);
    let data = await Employee.find({});
    res.send(data);
    //res.render('employee',{data});

    
});



app.post('/register', async (req, res) => {

    await empModel.register(req, res);

    res.redirect('/save');
});

app.post('/log-in', async (req, res) => {
    console.log(req.body);

    let emp = await Employee.findOne({ email: req.body.email });
    console.log(emp);
    if (!emp) {
        res.redirect('/loginfail');
    }
    else {
        console.log((emp._id).toString())
        const user={
            _id: ((emp._id).toString()),
            email:emp.email
        }
        const token = jwt.sign(user, key ,{ expiresIn: '10m'});
        console.log(token);
        res.json({ token });
    }
})
// function verifyToken(req, res, next) {
//     console.log('avesh here -------1');
//     const vtoken = req.headers.authorization;
//     console.log(vtoken);
//     if (vtoken !== undefined) {
//         const tok = vtoken.split('.');
//         req.token = tok[1];
//         console.log(req.token);
//         next();
//     }

// }



app.post('/jwt', (req, res) => {
    console.log("Inside JWT");
    const token =  req.headers.authorization;
    console.log(token);
    const data = jwt.verify(token, key);
    console.log(data);
    res.send(data)
    // console.log(req.token,'pppppppp');
    // const data = jwt.verify(req.token, key);
    // console.log(data);
})

app.listen(3000, () => {
    console.log('server is listenning port 3000');
})