const express=require('express');

const {Employee,connectMongoose}= require("./db.js");
//const ejs =require('ejs')
var app =express();
connectMongoose();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.set("views",__dirname);
app.set("view engine","ejs");

app.get('/',(req,res)=>{
    res.render("index");
})

app.post('/register',async(req,res)=>{
 let data=req.body;
 let user= await Employee.findOne().where({email:data.email})
 if(user) {
    //return res.redirect("exist");
    res.send('ftftgtg')
 }
 else{
    let newUser=await Employee.create(data);
    res.status(201).redirect("home");

 }
})

app.listen(5000,()=>{
    console.log('server is listenning port 5000');
})