import express from "express";
import { addTask, deleteTask, updateTasks, employeeDashboard } from "../controllers/employee.controller.js";
import { dashboard } from "../controllers/employer.controller.js";

const employeeRouter = express.Router();

// Middleware for checking the role of the user
const checkRole = (req, res, next) => {
    if (req.user.role !== 'employee') {
        return res.status(403).send('Access denied');
    }
    next();
    // res.sendFile(path.join(__dirname, 'employer.html'));
}


// employeeRouter.use(checkRole());

// Routes 
employeeRouter.get("/", checkRole, async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({ user })
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
})
employeeRouter.post("/task", checkRole, addTask)   // Create a Task. 
employeeRouter.get("/task", checkRole, employeeDashboard)   // Get Tasks . 
employeeRouter.put("/task/:taskId", checkRole, updateTasks)   // Update Task 
employeeRouter.delete("/task/:taskId", checkRole, deleteTask)  // Delete a Task . 


//Exporting the employeeRouter.
export default employeeRouter;