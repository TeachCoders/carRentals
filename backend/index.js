let express = require('express')
let dotenv = require('dotenv')
let cors = require ('cors')
let app = express()
app.use(cors())
let cookiParser = require('cookie-parser')

app.use(express.static('public'));
app.use(cookiParser())

dotenv.config({path:'./connection/config.env'})
let database = require('./connection/database')
database()
app.get('/', (req, res)=>{
  res.send('hello Teach Coders')
})

//category router
let catRoute = require('./router/catRoute')
app.use('/category', catRoute)

//Product category router
let productrouter = require('./router/subCatRoute')
app.use('/subcategory', productrouter)


//Transport List router
let transport = require('./router/transportRoute')
app.use('/transport', transport)

//Transport List router
let tour = require('./router/tourRoute')
app.use('/tour', tour)





let getapi = require('./router/GetApi')
app.use('/api', getapi)


let auth = require('./router/auth/authRouter')
app.use('/auth', auth)

//transport

// let transportRoute = require('./router/commonProductRouter')
// app.use('/common-product/', transportRoute)

// let tourRouter = require('./router/tourRouter')
// app.use('/transport/', tourRouter)


app.listen(process.env.PORT, ()=>{
    console.log(process.env.PORT+' Port Working')
})