let express = require('express')
let bodyParser = require('body-parser')
let router = express()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))

let categoryModel = require('../model/categoryModel')
let productCategoryModel = require('../model/subcategoryModel')
let transportModel = require('../model/transportModel')
let tourModel = require('../model/tourModel')



// Find Category : http://localhost:600/getApi/category (like find = Transport, Tours)

router.get('/category', (req, res)=>{
    categoryModel.find({}).populate('subCatlistid')
    .then((x)=>{        
        res.send(x)
    })    
})




// ---------(All List Categroy here)
//1. http://localhost:600/api/category/transport
//2. http://localhost:600/api/category/tour

router.get('/category/:id', (req, res)=>{
    categoryModel.findOne({ctUrl:req.params.id}).populate('subCatlistid')
    .then((x)=>{        
        res.send(x)
    })    
})



router.get('/subCategory/', (req, res)=>{
    productCategoryModel.find({}).populate('dtlspageRefid')
    .then((x)=>{        
        res.send(x)
    })    
})


// ---------(All List Sub Categroy here)
//1. http://localhost:600/api/subCategory/transport
//2. http://localhost:600/api/subCategory/tour

router.get('/subCategory/:id', (req, res)=>{
    if(req.params.id==='tour'){
        productCategoryModel.find({SbctNavUrl:req.params.id}).populate(['tourpageRefid'])
        .then((x)=>{        
            res.send(x)
        })  
    }
    else{ 
        productCategoryModel.find({SbctNavUrl:req.params.id}).populate(['dtlspageRefid'])
        .then((x)=>{        
            res.send(x)
        })  
    }  
})



// ---------(All inner index page here)
//1. http://localhost:600/subcategory/economy
//2. http://localhost:600/subcategory/uttrakhand

// router.get('/subCategory/:id/:id2', async (req, res) => {
//     console.log(req.params.id)
//     console.log(req.params.id2)
//     await productCategoryModel.findOne({SbctUrl: req.params.id2}).populate('dtlspageRefid')
//         .then((x) => {
//             res.send(x)
//         })
// })


router.get('/subCategory/:id/:id2', (req, res)=>{
    if(req.params.id==='tour'){
        productCategoryModel.find({SbctUrl:req.params.id2}).populate(['tourpageRefid'])
        .then((x)=>{        
            res.send(x)
        })  
    }
    else{ 
        productCategoryModel.find({SbctUrl:req.params.id2}).populate(['dtlspageRefid'])
        .then((x)=>{        
            res.send(x)
        })  
    }  
})


router.get('/subCategory/:id/:id2/:id3', (req, res)=>{
    if(req.params.id==='tour'){
        tourModel.find({tourUrl:req.params.id3})
        .then((x)=>{        
            res.send(x)
        })  
    }
    else{ 
        transportModel.find({transUrl:req.params.id3})
        .then((x)=>{        
            res.send(x)
        })  
    }  
})



// router.get('/:id/', (req, res)=>{
//     productCategoryModel.find({})
//     .then((x)=>{
        
//         res.send(x)
//     })    
// })


module.exports = router