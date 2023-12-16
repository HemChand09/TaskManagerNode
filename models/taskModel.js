const mongoose = require('mongoose');

const taskModel = mongoose.Schema({
    title:{
        type : String,
        required: true,
    },
    description:{
        type : String,
        required: true,
    },
    dueDate:{
        type:Number,
        required: true,
    },
    completed:{
        type:Boolean,
        default: false,
    },
    taskId:{
        type:String,
        required: true,
    },
    updatedAt:Number,
    userId:{
        type:String,
        required: true,
    }
});

const Task = mongoose.model('Tasks', taskModel);
module.exports = Task;