
const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const EmployeeSchema= new Schema({
    name:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:false
    }
});

const Employee = mongoose.model('Employee',EmployeeSchema);
module.exports = {Employee}
