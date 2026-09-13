const mongoose = require('mongoose');

const ConnectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Mongodb Connected Succesfully');
    }
    catch(err){
        console.log('Mongodb Connection Failed',err);
    }
}

module.exports = ConnectDB;