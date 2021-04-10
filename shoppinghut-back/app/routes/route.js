const express = require('express');
const appConfig = require("../../config/appConfig")
const checking = require("../middlewares/checkuser")
const pretty = require('express-prettify');
const pager=require('../middlewares/paginate')
const userController = require("./../../app/controllers/userController");
const itemController = require("./../../app/controllers/itemController");
const addFile=require("../libs/addfile");

module.exports.setRouter = (app) => { 

    let baseUrl = `${appConfig.apiVersion}`;
  
    app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
      next();
  });
  
    app.use(pretty());

    app.post(`${baseUrl}/addtoCart`,itemController.addToCart)

    app.post(`${baseUrl}/addItem`,addFile.upload.single('image'),itemController.addItem);

    app.get(`${baseUrl}/getAll`,itemController.getAllItem)

    app.get(`${baseUrl}/getItemDetail/:itemId`,itemController.getItemDetail)

    app.get(`${baseUrl}/uploads/:image`,(req,res)=>{res.sendfile(`uploads/${req.params.image}`)})

    app.get(`${baseUrl}/getCartItems/:userId`,userController.getCartItems)

    app.post(`${baseUrl}/login`,userController.login)

    
    
}
