const mongoose = require('mongoose');
const connectdb = async ()=>{
    try{
        mongoose.connect('mongodb://localhost:27017/authentication')
       .then(()=>console.log("database connected"));

    } catch(error){
        console.log(error);
    }
}


module.exports = connectdb;