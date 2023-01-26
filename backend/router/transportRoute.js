let express = require('express')
let bodyParser = require('body-parser')
let transportModel = require('../model/transportModel')
let subCategoryModel = require('../model/subcategoryModel')
let upload = require('../multer/multer')
let router = express()
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

// 1. find all productCategory (get)                   = http://localhost:600/transport/)
// 2. Add productCategory (Post )                      = http://localhost:600/transport/addApi
// 3. Find Single productCategory (get)                = http://localhost:600/transport/DYNAMIC_ID
// 4. update productCategory (put)                     = http://localhost:600/transport/editApi/DYNAMIC_ID
// 5. Delete Single productCategory (delete)           = http://localhost:600/transport/deleteApi/DYNAMIC_ID
// 5. Delete All productCategory (delete)              = http://localhost:600/transport/delete/


//find productCategory (http://localhost:600/transport/)
router.get('/', async (req, res) => {
    await transportModel.find({})
        .then((x) => {
            res.status(200).json(x)
        })
})


//get add productCategory url  (http://localhost:600/transport/addApi)
router.get('/addApi', (req, res) => {
    res.send('add productCategory')
})



//post add productCategory url  (http://localhost:600/transport/addApi)
//post add productCategory url  (http://localhost:600/transport/addApi)
router.post('/addApi', upload.fields([{ name: 'prdSliderInputField' }, { name: 'prdThumbInputField' }]), async (req, res) => {
    req.files
    console.log(req.body)
    await transportModel.findOne({ transUrl: req.body.transUrl })
        .then((x) => {
            if (x) {
                res.status(200).json({ 'errorMessage': 'You have already This url, Please use another url' })
                //res.status(1100).json({ 'errorMessage': 'You have already This url, Please use another url' })        
            }
            else {
                let getdata = async () => {
                    let { dtlspageRefid, transNav, transUrl, transTitle, transMetaDesc, transMetaKey, transH1, transHlView, transHlPoint, transDtls} = req.body;
                    await transportModel.create({
                        //dtlspageRefid:dtlspageRefid,
                        transTitle: transTitle,
                        transNav: transNav,
                        transUrl: transUrl,
                        transMetaDesc: transMetaDesc,
                        transMetaKey: transMetaKey,
                        transH1: transH1,
                        transHlView : transHlView,
                        transHlPoint : transHlPoint,
                        transDtls: transDtls,
                        transThumb: req.files.prdThumbInputField ? req.files.prdThumbInputField.map((b) => { return b.filename }) : '',
                        //multiple image name save from here
                        transSlider: req.files.prdSliderInputField ? req.files.prdSliderInputField.map((a) => { return a.filename }) : '',
                        //Note 1:  yaha per (upper line per) ternary operator kaa use karke map method use ker rahe hai
                        //Note 2 :  ternar operatory :=> ternary operator kaa use "req.file" ko check karne ke liye use kiya gaya hai ki respone men "req.file" mil raha hai yaa nahin
                        //Note 3 : map method ka use "transSlider" men ak-ak file name ko array ke roop men save karaane ke liye kiya gaya hai                

                    })
                        .then((x) => {
                            console.log(dtlspageRefid)
                            subCategoryModel.findOneAndUpdate({ _id: dtlspageRefid }, {
                                $push: {
                                    dtlspageRefid : x._id
                                }
                            })
                            .then((x)=>{
                                res.status(200).json({ 'message': 'category Added in Data base' })
                            })
                        })
                }
                getdata()
            }
        })
        .catch((y) => {
            console.log('teeeee')
        })
})






//find single productCategory by id (http://localhost:600/transport/DYNAMIC_ID)
router.get('/:id', async (req, res) => {
    await transportModel.findOne({ transUrl: req.params.id })
        .then((x) => {
            // res.status(200).json(x)
            res.send(x)
        })
        .catch((console.error()))
})



//update productCategory by id (http://localhost:600/transport/editApi/DYNAMIC_ID)
router.put('/editApi/:id', upload.fields([{ name: 'prdSliderInputField' }, { name: 'prdThumbInputField' }]), async (req, res) => {
    req.files
    //console.log(req.body)
    let { transNav, transUrl, transTitle, transMetaDesc, transMetaKey, transH1, transDtls, transHlView, transHlPoint } = req.body;
    await transportModel.findOneAndUpdate({ transUrl: req.params.id },
        req.files.prdSliderInputField && req.files.prdThumbInputField ?
            {
                transNav: transNav,
                transUrl: transUrl,
                transTitle: transTitle,
                transMetaDesc: transMetaDesc,
                transMetaKey: transMetaKey,
                transH1: transH1,
                transDtls: transDtls,
                transHlView : transHlView,
                transHlPoint : transHlPoint,
                transThumb: req.files.prdThumbInputField.map((a) => a.filename),
                transSlider: req.files.prdSliderInputField.map((a) => a.filename)
            } :
            req.files.prdThumbInputField ?
                {
                    transNav: transNav,
                    transUrl: transUrl,
                    transTitle: transTitle,
                    transMetaDesc: transMetaDesc,
                    transMetaKey: transMetaKey,
                    transH1: transH1,
                    transHlView : transHlView,
                    transHlPoint : transHlPoint,
                    transDtls: transDtls,
                    transThumb: req.files.prdThumbInputField.map((a) => a.filename)

                }
                :
                req.files.prdSliderInputField ?
                    {
                        transNav: transNav,
                        transUrl: transUrl,
                        transTitle: transTitle,
                        transMetaDesc: transMetaDesc,
                        transMetaKey: transMetaKey,
                        transH1: transH1,
                        transDtls: transDtls,
                        transHlView : transHlView,
                        transHlPoint : transHlPoint,
                        transSlider: req.files.prdSliderInputField.map((a) => a.filename)
                    }
                    : {
                        transNav: transNav,
                        transUrl: transUrl,
                        transTitle: transTitle,
                        transMetaDesc: transMetaDesc,
                        transMetaKey: transMetaKey,
                        transH1: transH1,
                        transHlView : transHlView,
                        transHlPoint : transHlPoint,
                        transDtls: transDtls
                    }
    )
        .then((x) => {
            if (res.status == 200) {
                res.json({ 'message': 'productCategory Added in Data base' })
            }
            else {
                res.json({ 'errorMessage': 'You have already This url, Please use another url' })
            }

        })
        .catch((Error) => {
            console.log(Error)
            res.status(11000).json({ 'message': 'productCategory Added in Data base' })
            return false
        })
})





//delete single productCategory  (http://localhost:600/transport/subcategory/delete/DYNAMIC_ID)
router.delete('/deleteApi/:id', async (req, res) => {
    await transportModel.findByIdAndDelete({ _id: req.params.id })
        .then((x) => {
            res.status(200).json({ 'message': 'productCategory has deleate from  Database' })
        })
})


//delete single productCategory  (http://localhost:600/transport/subcategory/delete/)
router.delete('/deleteApi/', async (req, res) => {
    await transportModel.remove({})
        .then((x) => {
            res.status(200).json({ 'message': 'All productCategory has deleated from  Database' })
        })
})








// router.post('/addWebsite', (req, res)=>{
//     res.send('add Website name')
// })

module.exports = router