const jwt = require("jsonwebtoken");
const authModel = require("../model/loginModel");
const keysecret = 'rajnishbharti008798991653'

const authenticate = async(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        //console.log(token)
        const verifytoken = jwt.verify(token, keysecret);
        //console.log(verifytoken)
        const rootUser = await authModel.findOne({_id:verifytoken._id})
        //console.log(rootUser)
        if(!rootUser){throw new Error("User Not Fount")}
            req.token = token
            req.rootUser = rootUser
            req.userId = rootUser._id
            next()
        
    }
    catch(error){
        res.status(401).json({status :401, message: "Unathuraize no token provide"} )
    }

}

module.exports = authenticate