const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
mongoose.set('strictQuery', true);
const connectToMongo = ()=> {
    mongoose.connect(mongoURI, ()=>{
        console.log("connected bro")
    })
}
module.exports = connectToMongo;
