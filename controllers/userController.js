const User = require("../models/userModel");
const { getUserTaskList } = require("../services/taskService");
const catchAsync = require("../utils/catchAsyncHandler")

const getAllUsers =catchAsync( async(req,res,next)=>{
    const users = await User.find();
    if(!users) return next('Nope ', 404)
    res.status(200).json({
        status: 'success',
        usersLength: users.length,
        data:{
            users
        }
    })
});


const deleteUser =catchAsync( async(req,res,next)=>{
    console.log(req.params.userId,"User Delete API Hits")
    await User.findOneAndDelete({userId:req.params.userId});
    res.status(204).json({
        status: 'success',
    })
});
const getUserTasksLs = catchAsync( async(req,res,next)=>{
    console.log(req.params.userId,"Id Data coming")
    const userTasks = await getUserTaskList(req.params.userId);
    console.log(userTasks,"userTasks Data")
    res.status(200).json({
        status: 'success',
        data:userTasks
    });

})
module.exports ={ getAllUsers , deleteUser , getUserTasksLs}