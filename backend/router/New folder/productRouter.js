let express = require('express')
let bodyParser = require('body-parser')
let productModel = require('../model/productModel')
let upload = require('../multer/multer')
let router = express()
router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

// 1. find all product (get)                   = http://localhost:600/product/)
// 2. Add product (Post )                      = http://localhost:600/product/add-product
// 3. Find Single product (get)                = http://localhost:600/product/findproduct/DYNAMIC_ID
// 4. update product (put)                     = http://localhost:600/product/edit-product/DYNAMIC_ID
// 5. Delete Single product (delete)           = http://localhost:600/product/product/delete/DYNAMIC_ID
// 5. Delete All product (delete)              = http://localhost:600/product/product/delete/


//find product (http://localhost:600/product/)
router.get('/', async (req, res) => {
    await productModel.find({})
        .then((x) => {
            res.status(200).json(x)
        })
})


//get add product url  (http://localhost:600/product/add-product)
router.get('/add-product', (req, res) => {
    res.send('add product')
})



//post add product url  (http://localhost:600/product/add-product)
//post add product url  (http://localhost:600/product/add-product)
router.post('/add-product',  upload.fields([{name:'SliderInputField'}, { name: 'thumbInputField' }]), async (req, res) => {
    req.files


    await productModel.findOne({key_url:req.body.key_url}).populate('key_id_related_product')
    .then((x)=>{
       if(x){      
       res.status(200).json({ 'errorMessage': 'You have already This url, Please use another url' })
        //res.status(1100).json({ 'errorMessage': 'You have already This url, Please use another url' })        
       }       
       else {
           let getdata= async()=>{
                let {key_id_related_product,  key_url, key_metaDesc, key_metaKeword, key_h1, key_catdtls } = req.body;
                await productModel.create({
                key_id_related_product : key_id_related_product,
                 key_url: key_url,
                 key_metaDesc: key_metaDesc,
                 key_metaKeword: key_metaKeword,
                 key_h1: key_h1, 
                 key_catdtls: key_catdtls,
                 key_thumb: req.files.thumbInputField? req.files.thumbInputField.map((b)=>
                 {return b.filename }): '', 
                 //multiple image name save from here
                 key_slider: req.files.SliderInputField? req.files.SliderInputField.map((a)=>
                                        {return a.filename }): '', 
                //Note 1:  yaha per (upper line per) ternary operator kaa use karke map method use ker rahe hai
                //Note 2 :  ternar operatory :=> ternary operator kaa use "req.file" ko check karne ke liye use kiya gaya hai ki respone men "req.file" mil raha hai yaa nahin
                //Note 3 : map method ka use "key_slider" men ak-ak file name ko array ke roop men save karaane ke liye kiya gaya hai                
                 
             })
                .then((x) => {
                    res.status(200).json({ 'message': 'product Added in Data base' })
                })
            }
            getdata()
       }
      
        
    })
    .catch((y)=>{
        console.log('teeeee')
    })

})






//find single product by id (http://localhost:600/product/findproduct/DYNAMIC_ID)
router.get('/findproduct/:id', async (req, res) => {
    await productModel.findById({ _id: req.params.id }).populate('key_id_related_product')
        .then((x) => {
            // res.status(200).json(x)
            res.send(x)
        })
        .catch((console.error()))
})


   
//update product by id (http://localhost:600/product/edit-product/DYNAMIC_ID)
router.put('/edit-product/:id', upload.fields([{ name: 'SliderInputField' }, { name: 'thumbInputField' }]), async (req, res) => {
    req.files

    let { key_url, key_metaDesc, key_metaKeword, key_h1, key_catdtls } = req.body;
    await productModel.findByIdAndUpdate({ _id: req.params.id }, 
            req.files.SliderInputField && req.files.thumbInputField?
            {
                key_url: key_url,
                key_metaDesc: key_metaDesc,
                key_metaKeword: key_metaKeword,
                key_h1: key_h1,
                key_catdtls: key_catdtls,
                key_thumb: req.files.thumbInputField.map((a) => a.filename), 
                key_slider: req.files.SliderInputField.map((a) => a.filename) 
            }:
            req.files.thumbInputField ?
            {
                key_url: key_url,
                key_metaDesc: key_metaDesc,
                key_metaKeword: key_metaKeword,
                key_h1: key_h1,
                key_catdtls: key_catdtls,
                key_thumb: req.files.thumbInputField.map((a) => a.filename) 
                
            }
            :
            req.files.SliderInputField?
            {
                key_url: key_url,
                key_metaDesc: key_metaDesc,
                key_metaKeword: key_metaKeword,
                key_h1: key_h1,
                key_catdtls: key_catdtls,
                key_slider: req.files.SliderInputField.map((a) => a.filename) 
            }
            :{
                key_url: key_url,
                key_metaDesc: key_metaDesc,
                key_metaKeword: key_metaKeword,
                key_h1: key_h1,
                key_catdtls: key_catdtls
            }
        )
        .then((x) => {
            console.log(res)
            if(res.status==200){
                res.json({ 'message': 'product Added in Data base' })
            }
            else{
                res.json({ 'errorMessage': 'You have already This url, Please use another url' })
            }
           
        })
        .catch((Error)=>{
            console.log(Error)
            res.status(11000).json({ 'message': 'product Added in Data base' })
            return false
        })
})





        //delete single product  (http://localhost:600/product/product/delete/DYNAMIC_ID)
        router.delete('/product/delete/:id', async(req, res)=>{
            await productModel.findByIdAndDelete({_id:req.params.id})
                .then((x)=>{
                    res.status(200).json({'message' : 'product has deleate from  Database'})
                })
        })


        //delete single product  (http://localhost:600/product/product/delete/)
        router.delete('/product/delete/', async(req, res)=>{
        await productModel.remove({})
            .then((x)=>{
                res.status(200).json({'message' : 'All product has deleated from  Database'})
            })
        })








// router.post('/addWebsite', (req, res)=>{
//     res.send('add Website name')
// })

module.exports = router