const {Employee}= require('../db');

module.exports.register = (req,res)=>{
    return new Promise((resolve) => {
        Employee.create({name:req.body.name,email:req.body.email,password:req.body.password},(err, result)=>{
            if(err) throw err;
            else{
                resolve(result);
            }
        })
    })
}