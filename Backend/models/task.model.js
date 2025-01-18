// Task Schema
import mongoose from 'mongoose';


const taskSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    timeSpent: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        required: true
    },
    category: {
        type: String,
        enum: ['BAU', 'AdHoc', 'Project'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'inProgress', 'completed'],
        default: 'pending'
    },
    reference: {
        name: String,
        role: String,
        email: String
    },
    attachments: [{
        name: String,
        url: String,
        uploadedAt: Date
    }],
    // comments: [{
    //     userId: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User'
    //     },
    //     content: String,
    //     createdAt: {
    //         type: Date,
    //         default: Date.now
    //     }
    // }],
    // efficiency: {
    //     type: Number,
    //     min: 0,
    //     max: 100
    // }
}, {
    timestamps: true
});


const Task = new mongoose.model("Task", taskSchema);

export default Task; 