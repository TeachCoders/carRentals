const multer  = require('multer')


//date

let newDate = new Date();
let year = newDate.getFullYear();
let month = newDate.getMonth();
let hours = newDate.getHours();
let minutes = newDate.getMinutes();
let seconds = newDate.getSeconds();
let finaltime = year+'-'+month+"-"+hours+"-"+minutes+"-"+seconds;

// use this variable == finaltime 



//

let storage = multer.diskStorage({
    destination:'public/images', //directory (folder) setting
    filename:(req, file, cb)=>{
       // cb(null, Date.now()+file.originalname) // file name setting
       cb(null, finaltime+file.originalname) // file name setting by year-moth-hours-minutes-second
    }
})


let upload = multer({
   'storage': storage,
   fileFilter:(req, file, cb)=>{
    if(
        file.mimetype == 'image/jpeg' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/gif'

    ){
        cb(null, true)
    }
    else{
        cb(null, false);
        cb(new Error('Only jpeg,  jpg , png, and gif Image allow'))
    }
   }
})


//let upload = multer({storage : storage})


module.exports = upload