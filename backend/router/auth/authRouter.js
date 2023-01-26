let express = require('express')
let bcrypt = require('bcryptjs')

let bodyParser = require('body-parser')
let authModel = require('../../model/loginModel')
let router = express()
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
const authenticate = require('../../middleware/authenticate');

let jwt = require('jsonwebtoken')
let secretkey = "secretkey"




//Registration Router
router.post('/signup', async (req, res) => {
     let { userName, email, password } = req.body
    await authModel.findOne({ email: email })
        .then((x) => {
            // yaha email cheack hoga ki user ke dwaar diye gaye email pahle se hai hai nahin
            if (x) {
                res.status(200).json({ 'error': `!Your have already use "${email}" email, Please try another email` })
            }
            else {
                authModel.create({
                    userName: userName,
                    email: email,
                    password: password
                })
                    .then((x) => {
                        res.status(200).json({ 'sucess': 'done' })
                    })
            }
        })
})


//Login Router
router.post('/', async (req, res) => {
    let { email, password } = req.body;
    try {
        const userValid = await authModel.findOne({email:email});
        if(userValid){
            const isMatch = await bcrypt.compare(password,userValid.password);
            if(!isMatch){
                res.status(200).json({ 'error': '!Your pasword invalid' })
            }
            else{
                const token = await userValid.generateAuthtoken();
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });
                const result = {
                    userValid,
                    token
                }
                //res.status(201).json({status:201,result})
                console.log(result)
                res.status(200).json({ 'sucess': 'done', result })
                console.log('Your pasword mathced')
            }
        }
        else{
            res.status(200).json({ 'error': `${email} email is invalid. Pleaset Try Valid email` })
        }

    }
    catch (error) {
        res.status(401).json(error);
        console.log("catch block");
    }

})

// router.get("/validuser",authenticate,async(req,res)=>{
//     console.log('done')
// })

router.get("/validuser",authenticate,async(req,res)=>{
    console.log('done')
    try {
        const ValidUserOne = await authModel.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});



router.get("/logout",authenticate,async(req,res)=>{
    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie",{path:"/"});

        req.rootUser.save();

        res.status(201).json({status:201})

    } catch (error) {
        res.status(401).json({status:401,error})
    }
})


module.exports = router