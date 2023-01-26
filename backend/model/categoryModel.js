let mongoose = require('mongoose')
let mySchema = mongoose.Schema({
     ctType :{type: String, required: true, unique:true},   
     ctUrl :String,  
    ctThumb:Array,
    ctTitle :String,
    ctMetadesc :String,
    ctMetakey :String,
    cth1 :String,
    ctSlider :Array,
    ctDtls :String,
    subCatlistid :[{type:"ObjectId", ref:"SubCategoryTable"}],
   // dtlspageRefid :[{type:"ObjectId", ref:"TransportTable"}] 
   // subCatlistid.dtlspageRefid:[{type:"ObjectId", ref:"SubCategoryTable"}],
})
let myModel = mongoose.model('categoryTable', mySchema)
module.exports = myModel
