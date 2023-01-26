let mongoose = require('mongoose')
let mySchema = mongoose.Schema({   
    SbctUrl :{type: String, required: true, unique:true},  
    SbctType :String,
    SbctNavUrl :String,
    SbctNav:String,
    SbctThumb:Array,
    SbctTitle:String,
    SbctMetadesc :String,
    SbctMetakey :String,
    Sbcth1 :String,
    SbctSlider :Array,
    SbctDtls :String, 
    dtlspageRefid :[{type:"ObjectId", ref:"TransportTable"}] ,
    tourpageRefid :[{type:"ObjectId", ref:"TourTable"}] ,
    
})
let myModel = mongoose.model('SubCategoryTable', mySchema)
module.exports = myModel
