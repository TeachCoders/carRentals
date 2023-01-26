let mongoose = require('mongoose')

let database = ()=>{
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.db, {useNewUrlParser: true, 
        useUnifiedTopology: true})
    .then((x)=>{
        console.log('database connected')
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = database
