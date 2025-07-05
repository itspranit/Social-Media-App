const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //include the array of ids of all coments in this post schema itself
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comment'
    }]
},{
   timestamp:true 
});
const Post=mongoose.model('Post',postSchema);
module.exports=Post;

//Note:we could have included post object inside users like
// we added comments objet inside post object but usecase of 
//this is rare like we very few times actually go to a user
// and see their post while comments are always displayed along side the post,which makes it faster