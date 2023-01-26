let express = require('express')
let bodyParser = require('body-parser')
let categoryModel = require('../model/categoryModel')
let subCategoryModel = require('../model/subcategoryModel')
let upload = require('../multer/multer')
let router = express()
router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

// 1. find all category (get)                   = http://localhost:600/category/)
// 2. Add Category (Post )                      = http://localhost:600/category/addApi
// 3. Find Single Category (get)                = http://localhost:600/category/DYNAMIC_ID
// 4. update Category (put)                     = http://localhost:600/category/editApi/DYNAMIC_ID
// 5. Delete Single Category (delete)           = http://localhost:600/category/deleteApi/DYNAMIC_ID
// 5. Delete All Category (delete)              = http://localhost:600/category/category/delete/
//.populate('subCatlistid')

//find category (http://localhost:600/category/)
router.get('/', async (req, res) => {
    await categoryModel.find({}).populate('subCatlistid')
        .then((x) => {
            res.status(200).json(x)
        })
})


//get add category url  (http://localhost:600/category/addApi)
router.get('/addApi', (req, res) => {
    res.send('add category')
})



//post add category url  (http://localhost:600/category/addApi)
//post add category url  (http://localhost:600/category/addApi)
router.post('/addApi',  upload.fields([{name:'SliderInputField'}, { name: 'thumbInputField' }]), async (req, res) => {
    req.files


    await categoryModel.findOne({ctUrl:req.body.ctUrl})
    .then((x)=>{
       if(x){      
       res.status(200).json({ 'errorMessage': 'You have already use This Category, Please Select another contegory' })
        //res.status(1100).json({ 'errorMessage': 'You have already This url, Please use another url' })        
       }       
       else {
           let getdata= async()=>{
                let {ctType, ctUrl,ctTitle, ctMetadesc, ctMetakey, cth1, ctDtls } = req.body;
                await categoryModel.create({                
                ctTitle:ctTitle,
                ctType : ctType,
                 ctUrl: ctUrl,
                 ctMetadesc: ctMetadesc,
                 ctMetakey: ctMetakey,
                 cth1: cth1, 
                 ctDtls: ctDtls,
                 ctThumb: req.files.thumbInputField? req.files.thumbInputField.map((b)=>
                 {return b.filename }): '', 
                 //multiple image name save from here
                 ctSlider: req.files.SliderInputField? req.files.SliderInputField.map((a)=>
                                        {return a.filename }): '', 
                //Note 1:  yaha per (upper line per) ternary operator kaa use karke map method use ker rahe hai
                //Note 2 :  ternar operatory :=> ternary operator kaa use "req.file" ko check karne ke liye use kiya gaya hai ki respone men "req.file" mil raha hai yaa nahin
                //Note 3 : map method ka use "ctSlider" men ak-ak file name ko array ke roop men save karaane ke liye kiya gaya hai                
                 
             })
                .then((x) => {
                    res.status(200).json({ 'message': 'category Added in Data base' })
                })
            }
            getdata()
       }
      
        
    })
    .catch((y)=>{
        console.log('teeeee')
    })

})






//find single category by id (http://localhost:600/category/DYNAMIC_ID)
router.get('/:id', async (req, res) => {
    await categoryModel.findOne({ctUrl: req.params.id }).populate('subCatlistid')
        .then((x) => {
            // res.status(200).json(x)
            res.send(x)
        })
        .catch((console.error()))
})


   
//update category by id (http://localhost:600/category/editApi/DYNAMIC_ID)
router.put('/editApi/:id', upload.fields([{ name: 'SliderInputField' }, { name: 'thumbInputField' }]), async (req, res) => {
    req.files

    let {ctType, ctUrl,ctTitle, ctMetadesc, ctMetakey, cth1, ctDtls } = req.body;
    await categoryModel.findOneAndUpdate({ctUrl: req.params.id }, 
            req.files.SliderInputField && req.files.thumbInputField?
            {
                ctTitle:ctTitle,
                ctType: ctType,
                ctUrl: ctUrl,
                ctMetadesc: ctMetadesc,
                ctMetakey: ctMetakey,
                cth1: cth1,
                ctDtls: ctDtls,
                ctThumb: req.files.thumbInputField.map((a) => a.filename), 
                ctSlider: req.files.SliderInputField.map((a) => a.filename) 
            }:
            req.files.thumbInputField ?
            {
                ctTitle:ctTitle,
                ctType:ctType,
                ctUrl: ctUrl,
                ctMetadesc: ctMetadesc,
                ctMetakey: ctMetakey,
                cth1: cth1,
                ctDtls: ctDtls,
                ctThumb: req.files.thumbInputField.map((a) => a.filename) 
                
            }
            :
            req.files.SliderInputField?
            {   ctTitle:ctTitle,
                ctType:ctType,
                ctUrl: ctUrl,
                ctMetadesc: ctMetadesc,
                ctMetakey: ctMetakey,
                cth1: cth1,
                ctDtls: ctDtls,
                ctSlider: req.files.SliderInputField.map((a) => a.filename) 
            }
            :{
                ctTitle:ctTitle,
                ctType:ctType,
                ctUrl: ctUrl,
                ctMetadesc: ctMetadesc,
                ctMetakey: ctMetakey,
                cth1: cth1,
                ctDtls: ctDtls
            }
        )
        .then((x) => {
            console.log(res)
            if(res.status==200){
                res.json({ 'message': 'category Added in Data base' })
            }
            else{
                res.json({ 'errorMessage': 'You have already This url, Please use another url' })
            }
           
        })
        .catch((Error)=>{
            console.log(Error)
            res.status(11000).json({ 'message': 'category Added in Data base' })
            return false
        })
})





        //delete single category  (http://localhost:600/category/category/delete/DYNAMIC_ID)
        router.delete('/deleteApi/:id', async(req, res)=>{
            await categoryModel.findByIdAndDelete({_id:req.params.id})
                .then((x)=>{
                    res.status(200).json({'message' : 'category has deleate from  Database'})
                })
        })


        //delete single category  (http://localhost:600/category/category/delete/)
        router.delete('/deleteApi/', async(req, res)=>{
        await categoryModel.remove({})
            .then((x)=>{
                res.status(200).json({'message' : 'All category has deleated from  Database'})
            })
        })








// router.post('/addWebsite', (req, res)=>{
//     res.send('add Website name')
// })

module.exports = router