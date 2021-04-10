const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let userSchema=new Schema(
    {
        userId:{
            type:String,
            unique:true,
        },
        email:{
            type:String,
            default:""
        },
        password:{
            type:String,
            default:""
        },
        firstName:{
            type:String,
            default:''
        },
        lastName:{
            type:String,
            default:''
        },
        address:[],
        cart:[]
    }
)

let itemSchema=new Schema({
    itemId:{
        type:String,
        unique:true
    },
    name:{
        type:String,
        default:''
    },
    description:{
        type:String,
        default:''
    },
    image:[],
    price:{
        type:Number,
        default:0
    },
    quantity:{
        type:Number,
        default:0
    }
})

mongoose.model('User', userSchema);
mongoose.model('Item', itemSchema);