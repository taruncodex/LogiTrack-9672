import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
    jobTitle : String,
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
    totalTasks: { type: Number },

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

const User = new mongoose.model("User", userSchema);

export default User; 