const Post=require('../models/post')

module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        user:reqq.user._id
    },function(err,post){
        if(err){
            console.log('error in creating post');
            return;
        }
        return res.redirect('back')
    })
}