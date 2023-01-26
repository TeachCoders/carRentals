let mongoose = require('mongoose')
let mySchema = mongoose.Schema({
  
    transUrl :{type: String, required: true, unique:true},  
    transNav :String,
    transThumb:Array,
    transTitle:String,
    transMetaDesc :String,
    transMetaKey :String,
    transH1 :String,
    transSlider :Array,
    transHlView:String,
    transHlPoint : String,
    transDtls :String,
})
let myModel = mongoose.model('TransportTable', mySchema)
module.exports = myModel
