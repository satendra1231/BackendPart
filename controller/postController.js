let PostCollection = require('../models/PostsSchema')
const createPost = async(req,res)=>{
    const {title,description,file} = req.body
    let userId = req.user._id;
    try {
        let data = await PostCollection.create({
            title,
            description,
            file,
            userId
        })
        res.json({msg:"post created successfully",success:true,data})
    } catch (error) {
        res.json({msg:"error in creating post",success:false,error:error.message}) 
    }

}
const updatePost = async(req,res)=>{
    const {title,description,file} = req.body;
    let postId = req.params._id

    
    try {
        let data = await PostCollection.findByIdAndUpdate(postId, {$set:{title:title,description:description,file:file}})
        res.json({msg:"post updated successfully",success:true})
    } catch (error) {
        res.json({msg:"not updated post",success:false,error:error.message})
    }
    

}
const deletePost = async(req,res)=>{
    let postId = req.params._id
    try {
        let data = await PostCollection.findByIdAndDelete(postId);
    res.json({msg:"post deleted successfully", success:true})
    } catch (error) {
        res.json({msg:"error in deleting post",success:false,error:error.message})
    }
}
const getAllUserPost = async(req,res)=>{
    try {
        let data = await PostCollection.find().populate({path:'userId',select:'name'}).populate({
            path:'comments',
            populate:{
                path:'user',
                select:'name'
            }
        })
        return res.json({msg:"post fetched successfully",data,success:true})
        
    } catch (error) {
        return res.json({msg:"error in getting posts",error:error.message,success:false}) 
    }

}
const getSingleUserPost = async(req,res)=>{
    let _id = req.user._id;
    //console.log(_id)
    try {
        let data = await PostCollection.find({userId:_id});
        res.json({msg:"post find successfully", success:true,data})
    } catch (error) {
        res.json({msg:"erro in getting post", success:false,error:error.message})
    }

}
const updateLike = async(req,res)=>{
    let postId = req.params.postId
    let userId = req.user._id;

    try {
        let post = await PostCollection.findById(postId);
    
        if(post.likes.includes(userId)){
            await post.likes.pull(userId)
        }
        else{
            await post.likes.push(userId)
        }
        await post.save();


        res.json({msg:"post like update successfully", success:true})
    } catch (error) {
        res.json({msg:"error in updating like", success:false,error:error.message})
    }
}

const addComment = async(req,res)=>{
    let postId= req.params.postId;
    const {text}= req.body;
    let userId = req.user._id;
   
   try {
    let post = await PostCollection.findById(postId);
    await post.comments.push({user:userId,text:text})
    await post.save();
    return res.json({msg:"comment added successfully", success:true})
   } catch (error) {
    res.json({msg:"error in adding comment",success:false,error:error.message})
   }
}

const deleteComment = async(req,res)=>{
    const {postId,commentId} = req.params;
    // console.log("postId=",postId)
    // console.log("commentId=",commentId)

    let post = await PostCollection.findById(postId)
    await post.comments.pull({_id:commentId})
    await post.save()
    res.json({msg:"comment deleted successfully",success:true})

}
module.exports = {
    createPost,
    updatePost,
    deletePost,
    getAllUserPost,
    getSingleUserPost,
    addComment,
    updateLike,
    deleteComment,
    addComment
}