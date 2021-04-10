const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('../libs/responseLib')
const check = require('../libs/checkLib');
const userModel = mongoose.model('User')
const itemModel = mongoose.model('Item')

let getCartItems=(req,res)=>{
    if(req.params.userId==null || req.params.userId==undefined){
        let apiresponse=response.generate(false,400,"Either User is not entered",req.body);
        res.send(apiresponse)
    }
    else{
        userModel.findOne({'userId':req.params.userId},(err,result)=>{
            if(err){
            let apiresponse=response.generate(false,400,"Either User or Item is not entered",req.body);
            res.send(apiresponse)
            }
            else{
            let apiresponse=response.generate(true,200,"cart Items Fetched successfully",result);
            res.send(apiresponse)
        }
        })}
}

let login=(req,res)=>{
    if(req.body.email===null || req.body.email==="undefined"){
        let apiresponse=response.generate(false,400,"User email is not entered",req.body.email);
        res.send(apiresponse)
    }
    else{
        userModel.findOne({'email':req.body.email},(err,result)=>{
            if(err){
                let apiresponse=response.generate(false,500,"Database Error",null);
                res.send(apiresponse)
                }
            else if(result===null){
                let apiresponse=response.generate(true,404,"Entered Email Not Registered",null);
                res.send(apiresponse)
            }
            else{
                userModel.findOne({'userId':req.body.userId},(err,res1)=>{
                    if(err){
                        let apiresponse=response.generate(true,500,"Database Error",null);
                        res.send(apiresponse)
                        }
                    else if(res1===null){
                        let apiresponse=response.generate(false,200,"Login Successfull",result);
                        res.send(apiresponse)
                    }
                    else{
                        userModel.findOneAndUpdate({'userId':result.userId},{$push:{'cart':res1.cart}},(err,res2)=>{
                            if(err){
                                let apiresponse=response.generate(true,500,"Database Error",null);
                                res.send(apiresponse)
                                }
                            else{
                                userModel.findOneAndDelete({'userId':req.body.userId})
                                let apiresponse=response.generate(false,200,"Login Successfull",res2);
                                res.send(apiresponse)
                            }  
                        })
                        
                    } 
                })
            }
        })
    }
}

module.exports={
    getCartItems:getCartItems,
    login:login
}