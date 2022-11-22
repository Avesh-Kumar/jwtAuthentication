const express = require('express');

const { Employees, connectMongoose } = require("./db.js");
//const ejs =require('ejs')
var app = express();
connectMongoose();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set("views", __dirname);
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("home");
})
app.get('/user', async (req, res) => {
    try {
        let data = await Employees.find();
        res.status(200).send(data);
    } catch (e) {
        res.status(409).send(e.message);
    }
})

app.get('/register',(req,res)=>{
    res.render('register')
})


app.post('/register', async (req, res) => {
    let data = req.body;
    // console.log(data)
    // try{
    // let user = await Employees.create({name:data.name,email:data.email,password:data.password});
    // res.send(user)
    // }catch(e){
    //     res.send(e.message);
    //}

    let user = await Employees.find({ email: data.email });
    //let jsonUser = JSON.stringify(user)
    //let newUser = JSON.parse(jsonUser)
    //console.log(user.length===0)
    //console.log(user === undefined)

    if (user.length === 0) {
        try {
            let user = await Employees.create({ name: data.name, email: data.email, password: data.password });
            res.send('new registration');
            //res.render("success");
        } catch (e) {
            res.send(e.message);
            //res.render("error");     
        }
    }
    else {

        res.send('user is already exist')
        //res.render("exist");

    }

})

app.listen(5000, () => {
    console.log('server is listenning port 5000');
})