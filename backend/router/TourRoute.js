let express = require('express')
let bodyParser = require('body-parser')
let tourModel = require('../model/tourModel')
let subCategoryModel = require('../model/subcategoryModel')
let upload = require('../multer/multer')
let router = express()
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

// 1. find all productCategory (get)                   = http://localhost:600/tour/)
// 2. Add productCategory (Post )                      = http://localhost:600/tour/addApi
// 3. Find Single productCategory (get)                = http://localhost:600/tour/DYNAMIC_ID
// 4. update productCategory (put)                     = http://localhost:600/tour/editApi/DYNAMIC_ID
// 5. Delete Single productCategory (delete)           = http://localhost:600/tour/deleteApi/DYNAMIC_ID
// 5. Delete All productCategory (delete)              = http://localhost:600/tour/delete/


//find productCategory (http://localhost:600/tour/)
router.get('/', async (req, res) => {
    await tourModel.find({})
        .then((x) => {
            res.status(200).json(x)
        })
})


//get add productCategory url  (http://localhost:600/tour/addApi)
router.get('/addApi', (req, res) => {
    res.send('add productCategory')
})



//post add productCategory url  (http://localhost:600/tour/addApi)
//post add productCategory url  (http://localhost:600/tour/addApi)
router.post('/addApi', upload.fields([{ name: 'tourSliderInputField' }, { name: 'tourThumbInputField' }]), async (req, res) => {
    req.files
    // console.log(req.body)
    await tourModel.findOne({ tourUrl: req.body.tourUrl })
        .then((x) => {
            if (x) {
                res.status(200).json({ 'errorMessage': 'You have already This url, Please use another url' })
                //res.status(1100).json({ 'errorMessage': 'You have already This url, Please use another url' })        
            }
            else {
                let getdata = async () => {
                    let { tourpageRefid, tourNav, tourUrl, tourTitle, tourMetadesc, tourMetakey, tourH1, tourDuration, tourRoute, tourHlView, tourHlPoint, tourDtls, dayTours } = req.body;
                    console.log(dayTours)
                    await tourModel.create({
                        //tourpageRefid:tourpageRefid,
                        tourTitle: tourTitle,
                        tourNav: tourNav,
                        tourUrl: tourUrl,
                        tourMetadesc: tourMetadesc,
                        tourMetakey: tourMetakey,
                        tourH1: tourH1,
                        tourDuration: tourDuration,
                        tourRoute: tourRoute,
                        tourHlView: tourHlView,
                        tourHlPoint: tourHlPoint,
                        tourDtls: tourDtls,
                        dayTours: dayTours.map((c) => { return JSON.parse(c) }),
                        tourThumb: req.files.tourThumbInputField ? req.files.tourThumbInputField.map((b) => { return b.filename }) : '',
                        //multiple image name save from here
                        tourSlider: req.files.tourSliderInputField ? req.files.tourSliderInputField.map((a) => { return a.filename }) : '',
                        //Note 1:  yaha per (upper line per) ternary operator kaa use karke map method use ker rahe hai
                        //Note 2 :  ternar operatory :=> ternary operator kaa use "req.file" ko check karne ke liye use kiya gaya hai ki respone men "req.file" mil raha hai yaa nahin
                        //Note 3 : map method ka use "tourSlider" men ak-ak file name ko array ke roop men save karaane ke liye kiya gaya hai                

                    })
                        .then((x) => {
                            console.log(tourpageRefid)
                            subCategoryModel.findOneAndUpdate({ _id: tourpageRefid }, {
                                $push: {
                                    tourpageRefid: x._id
                                }
                            })
                                .then((x) => {
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






//find single productCategory by id (http://localhost:600/tour/DYNAMIC_ID)
router.get('/:id', async (req, res) => {
    await tourModel.findOne({ tourUrl: req.params.id })
        .then((x) => {
            // res.status(200).json(x)
            res.send(x)
        })
        .catch((console.error()))
})



//update productCategory by id (http://localhost:600/tour/editApi/DYNAMIC_ID)
router.put('/editApi/:id', upload.fields([{ name: 'tourThumbInputField' }, { name: 'tourSliderInputField' }]), async (req, res) => {
    req.files
    let { tourNav, tourUrl, tourTitle, tourMetadesc, tourMetakey, tourH1, tourDuration, tourRoute, tourHlView, tourHlPoint, tourDtls, dayTours } = req.body;
    await tourModel.findOneAndUpdate({ tourUrl: req.params.id },
        req.files.tourSliderInputField && req.files.tourThumbInputField ?
            {
                tourThumb: req.files.tourThumbInputField.map((a) => a.filename),
                tourNav: tourNav,
                tourUrl: tourUrl,
                tourTitle: tourTitle,
                tourMetadesc: tourMetadesc,
                tourMetakey: tourMetakey,
                tourH1: tourH1,
                tourDuration: tourDuration,
                tourRoute: tourRoute,
                dayTours: dayTours.map((c) => { return JSON.parse(c) }),
                tourDtls: tourDtls,
                tourHlView: tourHlView,
                tourHlPoint: tourHlPoint,
                tourSlider: req.files.tourSliderInputField.map((a) => a.filename)
            } :
            req.files.tourThumbInputField ?
                {
                    tourThumb: req.files.tourThumbInputField.map((a) => a.filename),
                    tourNav: tourNav,
                    tourUrl: tourUrl,
                    tourTitle: tourTitle,
                    tourMetadesc: tourMetadesc,
                    tourMetakey: tourMetakey,
                    tourH1: tourH1,
                    tourDuration: tourDuration,
                    tourRoute: tourRoute,
                    tourHlView: tourHlView,
                    tourHlPoint: tourHlPoint,
                    dayTours: dayTours.map((c) => { return JSON.parse(c) }),
                    tourDtls: tourDtls


                }
                :
                req.files.tourSliderInputField ?
                    {
                        tourNav: tourNav,
                        tourUrl: tourUrl,
                        tourTitle: tourTitle,
                        tourMetadesc: tourMetadesc,
                        tourMetakey: tourMetakey,
                        tourH1: tourH1,
                        tourDuration: tourDuration,
                        tourRoute: tourRoute,
                        tourHlView: tourHlView,
                        tourHlPoint: tourHlPoint,
                        dayTours: dayTours.map((c) => { return JSON.parse(c) }),
                        tourDtls: tourDtls,
                        tourSlider: req.files.tourSliderInputField.map((a) => a.filename)
                    }
                    : {
                        tourNav: tourNav,
                        tourUrl: tourUrl,
                        tourTitle: tourTitle,
                        tourMetadesc: tourMetadesc,
                        tourMetakey: tourMetakey,
                        tourH1: tourH1,
                        tourDuration: tourDuration,
                        tourRoute: tourRoute,
                        dayTours: dayTours.map((c) => { return JSON.parse(c) }),
                        tourDtls: tourDtls,
                        tourHlView: tourHlView,
                        tourHlPoint: tourHlPoint,
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





//delete single productCategory  (http://localhost:600/tour/subcategory/delete/DYNAMIC_ID)
router.delete('/deleteApi/:id', async (req, res) => {
    await tourModel.findByIdAndDelete({ _id: req.params.id })
        .then((x) => {
            res.status(200).json({ 'message': 'productCategory has deleate from  Database' })
        })
})


//delete single productCategory  (http://localhost:600/tour/subcategory/delete/)
router.delete('/deleteApi/', async (req, res) => {
    await tourModel.remove({})
        .then((x) => {
            res.status(200).json({ 'message': 'All productCategory has deleated from  Database' })
        })
})




// router.post('/addWebsite', (req, res)=>{
//     res.send('add Website name')
// })

module.exports = router