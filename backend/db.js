//mongodb://127.0.0.1:27017

const mongoose =  require ('mongoose')
const mongoURI = "mongodb://127.0.0.1:27017/inote                       book"
const connectToMongo =()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log('Connected to mongoose Successfully');
    })
}

module.exports = connectToMongo;

