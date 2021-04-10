let paginate=(req,res,next)=>{
    if(req.query.page==undefined||req.query.page==null){
        req.query.page=1
    }
    else{
        req.query.page=parseInt(req.query.page)
    }
    if(req.query.limit==undefined||req.query.limit==null){
        req.query.limit=0
    }
    else{
        req.query.limit=parseInt(req.query.limit)
    }
    next()
}

module.exports={
    paginate:paginate
}