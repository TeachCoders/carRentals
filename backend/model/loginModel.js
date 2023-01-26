let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
const keysecret = 'rajnishbharti008798991653'

let signUpSchema = mongoose.Schema({

    
    userName : String,
    email : String,
    password : String,
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]

    // userName :{
    //     type:String,
    //     required:true,
    //     trim:true
    // },
    // email :{
    //     type:String,
    //     required:true,
    //     trim:true
    // },
    // password :{
    //     type:String,
    //     required:true,
    //     trim:true
    // }
})

// becript pasword
signUpSchema.pre('save', async function(next){
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password,12)
    next()
    } 
})

//generate token
// signUpSchema.mathods.generateAuthtoken = async function(){
//     try{
//         let tokenA = jwt.sign({_id:this._id}, secretkey, {
//             expiresIn : "1d"
//         });
//         this.tokens = this.tokens.concat({token:tokenA});
//         await this.save()
//         return tokenA;
//     }
//     catch(error){
//         res.status(423).json(error)
//     }
// }

// token generate
signUpSchema.methods.generateAuthtoken = async function () {
    try {
        let token23 = jwt.sign({ _id: this._id }, keysecret, {
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({ token: token23 });
        await this.save();
        return token23;
    } catch (error) {
        console.log(error)
        // res.status(422).json(error)
    }
}


let myModel = mongoose.model('Signup', signUpSchema)
module.exports = myModel