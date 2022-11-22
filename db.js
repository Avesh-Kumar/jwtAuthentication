const mongoose=require('mongoose');
exports.connectMongoose= function(){
    mongoose.connect("mongodb+srv://AveshKumar:AveshKumar33@cluster0.jbyq6le.mongodb.net/company?retryWrites=true&w=majority")
    .then((e)=>console.log('my visual studio is connect with mongodb atlas'))
    .catch((e)=>console.log(e));
};
const Schema=mongoose.Schema;

const EmployeeSchema= new Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    }
});
exports.Employees = mongoose.model('Employee',EmployeeSchema);