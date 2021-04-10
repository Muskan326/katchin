const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('../libs/responseLib')
const check = require('../libs/checkLib');
const userModel = mongoose.model('User')
const itemModel = mongoose.model('Item')

let addToCart=(req,res)=>{
    if(req.body.itemId===null){
        let apiresponse=response.generate(false,400,"Item is not entered",req.body);
        res.send(apiresponse)
    }
    else{
        if(check.isEmpty(req.body.userId)){
            let id=shortid.generate()
            let newUser=new userModel({
                userId:id,
            })
            newUser.save((err,res1)=>{
                if(err){
                    let apiresponse = response.generate(true, 500, 'Database Error. Cannot Fetch Details', null)
                    res.send(apiresponse)
                }
                else{
                    req.body.userId=res1.userId
                }
            })
        }
        
        userModel.find({'userId':req.body.userId},(err,result)=>{
            if(err){
                let apiresponse = response.generate(true, 500, 'Database Error. Cannot Fetch Details', null)
                res.send(apiresponse)
            }
            else if(result){
                console.log("res 1 "+ req.body.itemId)
                itemModel.findOne({'itemId':req.body.itemId},(err,res1)=>{
                    if(err){
                        let apiresponse = response.generate(true, 500, 'Database Error. Cannot Fetch Details', null)
                        res.send(apiresponse)
                    }
                    else if(res1===null){
                        let apiresponse = response.generate(true, 404, 'Item Does Not Exist', res1)
                        res.send(apiresponse)
                        }
                    else{
                        userModel.findOneAndUpdate({'userId':req.body.userId},{$push:{'cart':req.body.itemId}},(err,success)=>{
                            if(err){
                                let apiresponse = response.generate(true, 500, 'Database Error while adding Item to cart', null)
                                res.send(apiresponse)
                            }
                            else{
                                let apiresponse = response.generate(false, 200, 'Item Added Successfully', success)
                                res.send(apiresponse)
                            }
                        })
                    }
                })
            }
            else{
                let apiresponse = response.generate(true, 404, 'User Does Not Exist', null)
                res.send(apiresponse)
            }
        })
    }
}

let addItem=(req,res)=>{
    if (req.body.name=="") {
        let apiresponse = response.generate(true, 403, 'Please Enter Details to add the item', null)
        res.send(apiresponse)
    }
    else{
        let checkName=req.body.name
        itemModel.findOne({'name':checkName},(err,succ)=>{
            if(err){
                let apiresponse = response.generate(true, 500, 'Database Error. Cannot add  Details', null)
                res.send(apiresponse)
            }
            else if(check.isEmpty(succ)){
                let id = shortid.generate()
                let newItem=new itemModel({
                    itemId:id,
                    name:checkName,
                    description:req.body.description,
                    image:[req.body.image],
                    price:req.body.price,
                    quantity:1
                })
                newItem.save((err,result)=>{
                    if (err) {
                        let apiresponse = response.generate(true, 500, 'Database Error While Creating task', null)
                        res.send(apiresponse)
                    }
                    else{
                        let apiresponse = response.generate(false, 200, 'New Item Added Successfully', result)
                        res.send(apiresponse)
                    }})

            }
            else{
                itemModel.updateOne({'name':checkName},{$set:{'quantity':succ.quantity+1}},{$push:{'image':req.body.image}},(err,res1)=>{
                    if (err) {
                        let apiresponse = response.generate(true, 500, 'Database Error While adding Item', null)
                        res.send(apiresponse)
                    }
                    else{
                        let apiresponse = response.generate(false, 200, ' Item Added Successfully', res1)
                        res.send(apiresponse)
                    }
                })
            }
        }
        )
    }
}

let getAllItem=(req,res)=>{
    itemModel.find({},(err,result)=>{
        if (err) {
            let apiresponse = response.generate(true, 500, 'Database Error While fetching Items', null)
            res.send(apiresponse)
        }
        else{
            let apiresponse = response.generate(false, 200, 'Items fetched successfully', result)
            res.send(apiresponse)
        }
    })
}

let getItemDetail=(req,res)=>{
    itemModel.findOne({'itemId':req.params.itemId},(err,result)=>{
        if (err) {
            let apiresponse = response.generate(true, 500, 'Database Error While fetching Items', null)
            res.send(apiresponse)
        }
        else{

            result.image[0]=`~/v1/uploads/${result.image[0]}`
            let apiresponse = response.generate(false, 200, 'Item fetched successfully', result)
            res.send(apiresponse)

            // res.sendfile(`uploads/${result.image[0]}`)
        }
    })
}

module.exports={
    addToCart:addToCart,
    addItem:addItem,
    getAllItem:getAllItem,
    getItemDetail:getItemDetail
}

