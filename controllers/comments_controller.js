const Comment=require('../models/comment');
const post=require('../models/post');
module.exports.create=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                //handle err
                post.comments.push(comment);//func of mongodb
                post.save();
                res.redirect('/')
            })
        }
    })
}