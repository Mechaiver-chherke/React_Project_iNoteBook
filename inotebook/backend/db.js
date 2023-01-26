const mongoose = require('mongoose');

const mongoURI ="mongodb+srv://chherke:chherke%4024@cluster0.pcjaeju.mongodb.net/inotebook"
//const mongoURI = "mongodb+srv://chherke:chherke@24@cluster0.pcjaeju.mongodb.net/?retryWrites=true&w=majority"
//const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
mongoose.set('strictQuery', true);
const connectToMongo = ()=> {
    mongoose.connect(mongoURI, ()=>{
        console.log("connected bro")
    })
}

module.exports = connectToMongo;
