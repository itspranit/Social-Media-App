const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //comment belongs to a user
    user:{
        ref:'User',
        type:mongoose.Schema.Types.ObjectId,
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:true
});

const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;