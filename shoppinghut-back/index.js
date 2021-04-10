// this is needed for importing expressjs into our application
const express = require('express')
const appConfig = require('./config/appConfig')
const fs = require('fs')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const socket = require('socket.io');
// const bodyParser = require('body-parser')
const globalErrorMiddleware = require('./app/middlewares/appErrorHandler')
var multer = require('multer');
var upload = multer();


//declaring an instance or creating an application instance
const app = express()
var cors = require('cors')


app.use(cors());

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({
  extended: true
}));

app.use(cookieParser())


// Bootstrap models
let modelsPath = './app/models'
fs.readdirSync(modelsPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        require(modelsPath + '/' + file)
    }
  })
  // end Bootstrap models



// Bootstrap route

let routesPath = './app/routes'
fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
});
// end bootstrap route


  // calling global 404 handler after route
app.use(globalErrorMiddleware.globalNotFoundHandler)
 
  // end global 404 handler


//listening the server - creating a local server
const server =app.listen(appConfig.port, () => {
    //creating the mongo db connection here
    let db = mongoose.connect(appConfig.db.uri,{ useFindAndModify: false ,useNewUrlParser: true,useUnifiedTopology: true});
    console.log("BackEnd Connected with port 3000...")
    

})

// const socketLib = require("./app/libs/socketLib");
// const socketServer = socketLib.setServer(server);

// handling mongoose connection error
mongoose.connection.on('error', function (err) {
        console.log(err)

}); // end mongoose connection error

// handling mongoose success event
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log(err);

    } 

}); // end mongoose connection open handler