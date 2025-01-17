// User Schema
const userSchema = {
    email: String,
    password: String, // hashed
    firstName: String,
    lastName: String,
    role: {
        type: String,
        enum: ['employee', 'employer']
    },
    department: String,
    joinedAt: Date,
    lastLogin: Date,
    profilePicture: String,
    isActive: Boolean
}

// Task Schema
const taskSchema = {
    userId: ObjectId,  // reference to user who created the task
    title: String,
    description: String,
    category: {
        type: String,
        enum: ['BAU', 'AdHoc', 'Project']
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High']
    },
    status: {
        type: String,
        enum: ['ToDo', 'InProgress', 'Completed']
    },
    timeSpent: Number,  // in minutes
    startDate: Date,
    endDate: Date,
    reference: {
        name: String,
        role: String,
        email: String
    },
    attachments: [{
        fileName: String,
        fileUrl: String,
        uploadedAt: Date
    }],
    createdAt: Date,
    updatedAt: Date
}

// Department Schema
const departmentSchema = {
    name: String,
    description: String,
    managerId: ObjectId,  // reference to employer user
    createdAt: Date,
    updatedAt: Date
}

// Performance Metrics Schema
const performanceMetricsSchema = {
    userId: ObjectId,
    period: {
        startDate: Date,
        endDate: Date
    },
    metrics: {
        tasksCompleted: Number,
        totalTimeSpent: Number,
        tasksByCategory: {
            BAU: Number,
            AdHoc: Number,
            Project: Number
        },
        tasksByPriority: {
            Low: Number,
            Medium: Number,
            High: Number
        },
        averageTaskCompletionTime: Number
    },
    createdAt: Date
}