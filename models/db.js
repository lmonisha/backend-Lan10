const mongoose = require('mongoose');

module.exports =async  function connectTodb(){   
    // mongoose.set('useFindAndModify', false);
    // mongoose.set('useCreateIndex', true);
    // mongoose.set('useUnifiedTopology', true);
    // let dburl='mongodb://localhost:27017/test'
    let dburl='mongodb://127.0.0.1:27017/test'
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4 // Use IPv4, skip trying IPv6
    }
    try{
       await  mongoose.connect(dburl,options)
        .then(() => console.log('Connected to Iv-universe MongoDB...'))
        .catch((err) =>  console.log('mongodb connection error...',err));
    }catch(e){
        console.log('error ',e);
    }
}