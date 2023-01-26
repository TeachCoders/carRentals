let express = require('express')
let bodyParser = require('body-parser')
let tourModel = require('../model/tourModel')
let router = express()


router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

router.get('/', (req, res)=>{
    res.send('Chose option Car || Tour')
})

//1) trasport product       

        //get add tour url  (http://localhost:600/tour/add-tour-list)
        router.get('/add-tour-list', (req, res)=>{
            res.send('add tour')
        })


        //post add tour url  (http://localhost:600/tour/add-tour-list)
        router.post('/add-tour-list', async (req, res)=>{
            //let {tour_id, tourUrl, tourTitle, tourMeta, tourDescription, tourH1, tourOverView}=req.body
            await tourModel.create(req.body)
             .then((x)=>{
                res.status(200).json({'message' : 'tour List Added in Data base'})
             })
        })


        //find tour (http://localhost:600/tour/tour-list)
        router.get('/tour-list', async(req, res)=>{
                await tourModel.find({}).populate('tour_id')
                .then((x)=>{
                    res.status(200).json(x)
                })
        })


        //find single tour by id (http://localhost:600/tour-list/DYNAMIC_ID)
        router.get('/tour-list/:id', async(req, res)=>{
                await tourModel.find({}).populate('tour_id')
                .then((x)=>{
                    res.status(200).json(x)
                })
        })

         //update tour  (http://localhost:600/tour-list/edit/DYNAMIC_ID)
        router.put('/tour-list/edit/:id', async(req, res)=>{
            await tourModel.findOneAndUpdate({_id:req.params.id}, req.body)
            .then((x)=>{
                res.status(200).json({'message' : 'tour List update in Database'})
             })
        })


        //delete single tour  (http://localhost:600/tour-list/delete/DYNAMIC_ID)
        router.delete('/tour-list/delete/:id', async(req, res)=>{
            await tourModel.findOneAndRemove({_id:req.params.id})
                .then((x)=>{
                    res.status(200).json({'message' : 'tour List has deleate from  Database'})
                })
        })


        //delete single tour  (http://localhost:600/tour-list/delete/)
        router.delete('/tour-list/delete/', async(req, res)=>{
        await tourModel.remove({})
            .then((x)=>{
                res.status(200).json({'message' : 'All tour List has deleated from  Database'})
            })
        })








// router.post('/addWebsite', (req, res)=>{
//     res.send('add Website name')
// })

module.exports = router