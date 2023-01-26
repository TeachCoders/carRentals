let mongoose = require('mongoose')
let mySchema = mongoose.Schema({
    Tour_relational_id :[{type:"ObjectId", ref:"SubCategoryTable"}],
    tourUrl :{type: String, required: true, unique:true},  
    tourNav :String,
    tourThumb:Array,
    tourTitle:String,
    tourMetadesc :String,
    tourMetakey:String,
    tourH1 :String,
    tourDuration :Number,
    tourRoute :String,
    tourSlider :Array,
    tourHlView : String,
    tourHlPoint : String,
    tourDtls :String,
    dayTours: Array
})
let myModel = mongoose.model('TourTable', mySchema)
module.exports = myModel
