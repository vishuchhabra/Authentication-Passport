const mongoose = require('mongoose')

exports.connectionDB  = () =>{

    mongoose.connect('mongodb://localhost/Auth',{useUnifiedTopology: true ,useNewUrlParser: true,  useCreateIndex: true},(err, data)=>{
        if(err){
            console.log("There is an Error while connecting the DB")
        }
        else{
            console.log("DB connected Successfully")
        }
    });
}