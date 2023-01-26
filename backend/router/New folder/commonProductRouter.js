let express = require('express')
let bodyParser = require('body-parser')
let transportModel = require('../model/commonProductModel')
let router = express()


router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

// router.get('/', (req, res)=>{
//     res.send('Chose option Car || Tour')
// })

//1) trasport product   
// http://localhost:600/common-product/add-transport-list 
// http://localhost:600/common-product/add-transport-list
// http://localhost:600/common-product/   

        //get add transport url  (http://localhost:600/common-product/add-transport-list)
        router.get('/add-transport-list', (req, res)=>{
            res.send('add Transport')
        })


        //post add transport url  (http://localhost:600/common-product/add-transport-list)
        router.post('/add-transport-list', async (req, res)=>{
            console.log(req.body)
            //let {transport_id, transportUrl, transportTitle, transportMeta, transportDescription, transportH1, transportOverView}=req.body
            await transportModel.create(req.body)
             .then((x)=>{
                res.status(200).json({'message' : 'Transport List Added in Data base'})
             })
        })


        //find transport (http://localhost:600/common-product/)
        router.get('/', async(req, res)=>{
                await transportModel.find({}).populate('transport_id')
                .then((x)=>{
                    res.status(200).json(x)
                })
        })


        //find single transport by id (http://localhost:600/transport-list/DYNAMIC_ID)
        router.get('/transport-list/:id', async(req, res)=>{
                await transportModel.find({}).populate('transport_id')
                .then((x)=>{
                    res.status(200).json(x)
                })
        })

         //update transport  (http://localhost:600/transport-list/edit/DYNAMIC_ID)
        router.put('/transport-list/edit/:id', async(req, res)=>{
            await transportModel.findOneAndUpdate({_id:req.params.id}, req.body)
            .then((x)=>{
                res.status(200).json({'message' : 'Transport List update in Database'})
             })
        })


        //delete single transport  (http://localhost:600/transport-list/delete/DYNAMIC_ID)
        router.delete('/transport-list/delete/:id', async(req, res)=>{
            await transportModel.findOneAndRemove({_id:req.params.id})
                .then((x)=>{
                    res.status(200).json({'message' : 'Transport List has deleate from  Database'})
                })
        })


        //delete single transport  (http://localhost:600/transport-list/delete/)
        router.delete('/transport-list/delete/', async(req, res)=>{
        await transportModel.remove({})
            .then((x)=>{
                res.status(200).json({'message' : 'All Transport List has deleated from  Database'})
            })
        })








// router.post('/addWebsite', (req, res)=>{
//     res.send('add Website name')
// })

module.exports = router