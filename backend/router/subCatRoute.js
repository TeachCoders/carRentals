let express = require('express')
let bodyParser = require('body-parser')
let subCategoryModel = require('../model/subcategoryModel')
let categoryModel = require('../model/categoryModel')
let upload = require('../multer/multer')
let router = express()
router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

// 1. find all productCategory (get)                   = http://localhost:600/subcategory/)
// 2. Add productCategory (Post )                      = http://localhost:600/subcategory/addApi
// 3. Find Single productCategory (get)                = http://localhost:600/subcategory/DYNAMIC_ID
// 4. update productCategory (put)                     = http://localhost:600/subcategory/editApi/DYNAMIC_ID
// 5. Delete Single productCategory (delete)           = http://localhost:600/subcategory/deleteApi/DYNAMIC_ID
// 5. Delete All productCategory (delete)              = http://localhost:600/subcategory/delete/


//find productCategory (http://localhost:600/subcategory/)
router.get('/', async (req, res) => {
    await subCategoryModel.find({}).populate('dtlspageRefid')
        .then((x) => {
            res.status(200).json(x)
        })
})


//get add productCategory url  (http://localhost:600/subcategory/addApi)
router.get('/addApi', (req, res) => {
    res.send('add productCategory')
})



//post add productCategory url  (http://localhost:600/subcategory/addApi)
//post add productCategory url  (http://localhost:600/subcategory/addApi)
router.post('/addApi', upload.fields([{ name: 'prdSliderInputField' }, { name: 'prdThumbInputField' }]), async (req, res) => {
    req.files


    await subCategoryModel.findOne({ SbctUrl: req.body.SbctUrl })
        .then((x) => {
            if (x) {
                res.status(200).json({ 'errorMessage': 'You have already This url, Please use another url' })
                //res.status(1100).json({ 'errorMessage': 'You have already This url, Please use another url' })        
            }
            else {
                let getdata = async () => {
                    let { subCatlistid, SbctNav, SbctUrl, SbctTitle, SbctMetadesc, SbctMetakey, Sbcth1, SbctDtls } = req.body;
                    // console.log(subCatlistid)
                    let parentCategoryName = async () => {
                        await categoryModel.findOne({ _id: subCatlistid })
                            .then((x) => {
                                subCategoryModel.create({
                                    SbctNavUrl:x.ctUrl,
                                    SbctType: x.ctType,
                                    SbctTitle: SbctTitle,
                                    SbctNav: SbctNav,
                                    SbctUrl: SbctUrl,
                                    SbctMetadesc: SbctMetadesc,
                                    SbctMetakey: SbctMetakey,
                                    Sbcth1: Sbcth1,
                                    SbctDtls: SbctDtls,
                                    SbctThumb: req.files.prdThumbInputField ? req.files.prdThumbInputField.map((b) => { return b.filename }) : '',
                                    //multiple image name save from here
                                    SbctSlider: req.files.prdSliderInputField ? req.files.prdSliderInputField.map((a) => { return a.filename }) : '',
                                    //Note 1:  yaha per (upper line per) ternary operator kaa use karke map method use ker rahe hai
                                    //Note 2 :  ternar operatory :=> ternary operator kaa use "req.file" ko check karne ke liye use kiya gaya hai ki respone men "req.file" mil raha hai yaa nahin
                                    //Note 3 : map method ka use "SbctSlider" men ak-ak file name ko array ke roop men save karaane ke liye kiya gaya hai                

                                })
                                    .then((x) => {
                                        categoryModel.findOneAndUpdate({ _id: subCatlistid }, {
                                            $push: {
                                                subCatlistid: x._id
                                            }
                                        })
                                            .then((x) => {
                                                res.status(200).json({ 'message': 'productCategory Added in Data base' })
                                            })

                                    })
                            })
                    }
                    console.log(parentCategoryName())
                }
                getdata()
            }


        })
        .catch((y) => {
            console.log(y)
        })

})






//find single productCategory by id (http://localhost:600/subcategory/DYNAMIC_ID)
router.get('/:id', async (req, res) => {
    await subCategoryModel.findOne({SbctUrl: req.params.id })
        .then((x) => {
            // res.status(200).json(x)
            console.log(x)
            res.send(x)
        })
        .catch((console.error()))
})



//find single productCategory by id (http://localhost:600/subcategory/DYNAMIC_ID)
router.get('/:id', async (req, res) => {
    await subCategoryModel.find({SbctType: req.params.id }).populate('dtlspageRefid')
        .then((x) => {
            // res.status(200).json(x)
            res.send(x)
        })
        .catch((console.error()))
})


   
//update productCategory by id (http://localhost:600/subcategory/editApi/DYNAMIC_ID)
router.put('/editApi/:id', upload.fields([{ name: 'prdSliderInputField' }, { name: 'prdThumbInputField' }]), async (req, res) => {
    req.files
    console.log(req.body)

    let {/*subCatlistid,*/ SbctNav, SbctUrl, SbctTitle, SbctMetadesc, SbctMetakey, Sbcth1, SbctDtls } = req.body;
    await subCategoryModel.findOneAndUpdate({SbctUrl: req.params.id }, 
            req.files.prdSliderInputField && req.files.prdThumbInputField?
            {   
                //subCatlistid:subCatlistid,
                SbctNav: SbctNav,
                SbctUrl: SbctUrl,
                SbctTitle : SbctTitle,
                SbctMetadesc: SbctMetadesc,
                SbctMetakey: SbctMetakey,
                Sbcth1: Sbcth1,
                SbctDtls: SbctDtls,
                SbctThumb: req.files.prdThumbInputField.map((a) => a.filename), 
                SbctSlider: req.files.prdSliderInputField.map((a) => a.filename) 
            }:
            req.files.prdThumbInputField ?
            {
                //subCatlistid:subCatlistid,
                SbctNav: SbctNav,
                SbctUrl: SbctUrl,
                SbctTitle: SbctTitle,
                SbctMetadesc: SbctMetadesc,
                SbctMetakey: SbctMetakey,
                Sbcth1: Sbcth1,
                SbctDtls: SbctDtls,
                SbctThumb: req.files.prdThumbInputField.map((a) => a.filename) 
                
            }
            :
            req.files.prdSliderInputField?
            {
                //subCatlistid:subCatlistid,
                SbctNav: SbctNav,
                SbctUrl: SbctUrl,
                SbctTitle : SbctTitle,
                SbctMetadesc: SbctMetadesc,
                SbctMetakey: SbctMetakey,
                Sbcth1: Sbcth1,
                SbctDtls: SbctDtls,
                SbctSlider: req.files.prdSliderInputField.map((a) => a.filename) 
            }
            :{  
               // subCatlistid:subCatlistid,
                SbctNav: SbctNav,
                SbctUrl: SbctUrl,
                SbctTitle: SbctTitle,
                SbctMetadesc: SbctMetadesc,
                SbctMetakey: SbctMetakey,
                Sbcth1: Sbcth1,
                SbctDtls: SbctDtls
            }
        )
        .then((x) => { 
            
            // categoryModel.find({_id:x._id})
            // .then((x)=>{
            //     console.log(x)
            // })

            if(res.status==200){
                res.json({ 'message': 'productCategory Added in Data base' })
            }
            else{
                res.json({ 'errorMessage': 'You have already This url, Please use another url' })
            }           
        })
        .catch((Error)=>{
            console.log(Error)
            res.status(11000).json({ 'message': 'productCategory Added in Data base' })
            return false
        })
})





        //delete single productCategory  (http://localhost:600/subcategory/subcategory/delete/DYNAMIC_ID)
        router.delete('/deleteApi/:id', async(req, res)=>{
            await subCategoryModel.findByIdAndDelete({_id:req.params.id})
                .then((x)=>{
                    res.status(200).json({'message' : 'productCategory has deleate from  Database'})
                })
        })


        //delete single productCategory  (http://localhost:600/subcategory/subcategory/delete/)
        router.delete('/deleteApi/', async(req, res)=>{
        await subCategoryModel.remove({})
            .then((x)=>{
                res.status(200).json({'message' : 'All productCategory has deleated from  Database'})
            })
        })








// router.post('/addWebsite', (req, res)=>{
//     res.send('add Website name')
// })

module.exports = router