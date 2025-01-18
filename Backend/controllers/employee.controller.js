import Task from "../models/task.model.js";

export const addTask = async (req, res) => {
    try {
        // Step-1 : take details from the body {}
        // Step-2 : take employee id from the token 
        // Step-3 : 

    
        const { title, description, date, time_spent } = req.body;

        if (!title || !description || !date) {
            return res.status(400).json({ msg: "title, description, date  are required." })
        }

        const newTask = await Task.create({
            employee_id: req.user._id, // Attach logged-in employee's ID
            title,
            description,
            date,
            status,
            time_spent,
        });


    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}

export const getTasks = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}


export const updateTasks = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}


export const deleteTask = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}