const mongoose=require('mongoose');
exports.connectMongoose= ()=>{
    mongoose.connect("mongodb+srv://AveshKumar:AveshKumar33@cluster0.syb9smm.mongodb.net/company")
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
exports.Employee=mongoose.model('Employee',EmployeeSchema);