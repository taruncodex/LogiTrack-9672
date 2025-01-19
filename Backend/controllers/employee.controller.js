import Task from "../models/task.model.js";


export const addTask = async (req, res) => {
    try {
        // Step-1 : take details from the body {}
        // Step-2 : take employee id from the token 

        const { title, description, priority, category, date, status, time_spent } = req.body;

        if (!title || !description || !date || !status) {
            return res.status(400).json({ msg: "title, description, date  and status are required." })
        }

        const newTask = await Task.create({
            employeeId: req.user.id, // Attach logged-in employee's ID
            title,
            description,
            priority,
            category,
            date,
            status,
        });

        const user = req.user;
        console.log(user);

        user.taskList.push(newTask._id.toString());
        await user.save();

        console.log(user);

        return res.status(201).json({ msg: "Task is created Successfully", newTask });
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}

export const employeeDashboard = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}


export const updateTasks = async (req, res) => {
    try {

        const { title, description, priority, category, status } = req.body;
        const taskId = req.params.id;

        const query = {};
        if (title) {
            query.title = title;
        } if (description) {
            query.description = description;
        } if (priority) {
            query.priority = priority;
        } if (category) {
            query.category = category;
        } if (status) {
            query.status = status;
        }
        const task = await Task.findByIdAndUpdate(taskId, query);
        const UpdatedTask = await Task.findById(taskId);

        return res.status(200).json({
            msg: "task details has been Updated successfully.",
            OldRecord: task,
            updateTasks
        });

    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}


export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Course.findByIdAndDelete(taskId);
        return res.status(204).json({
            message: "Deleted Successfully."
        });
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}