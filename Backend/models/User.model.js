import mongoose, { Schema } from 'mongoose';

// User Schema includeing : name , email , password , role ,jobTitle , phone ,
//department, status, taskList, lastActive, profilepicture, metrics : { tasksCompleted:  averageTaskTime:  productivity: }

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['employee', 'employer'],
        required: true
    },
    jobTitle: String,
    phone: Number,
    department: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    },

    taskList: [{ type: Schema.Types.ObjectId, ref: "Task" }],

    lastActive: { type: Date, default: null },
    profilePicture: String,
    metrics: {
        tasksCompleted: { type: Number, default: 0 },
        averageTaskTime: { type: Number, default: 0 },
        productivity: { type: Number, default: 0 }
    }
}, {
    timestamps: true
});

// Create the User model 
const User = new mongoose.model("User", userSchema);

export default User;




// // Department Schema
// const departmentSchema = {
//     name: String,
//     description: String,
//     managerId: ObjectId,  // reference to employer user
//     createdAt: Date,
//     updatedAt: Date
// }

// Performance Metrics Schema
// const performanceMetricsSchema = {
//     userId: ObjectId,
//     period: {
//         startDate: Date,
//         endDate: Date
//     },
//     metrics: {
//         tasksCompleted: Number,
//         totalTimeSpent: Number,
//         tasksByCategory: {
//             BAU: Number,
//             AdHoc: Number,
//             Project: Number
//         },
//         tasksByPriority: {
//             Low: Number,
//             Medium: Number,
//             High: Number
//         },
//         averageTaskCompletionTime: Number
//     },
//     createdAt: Date
// }