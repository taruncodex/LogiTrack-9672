import express from "express";
import { addTask, deleteTask, updateTasks, getTasks } from "../controllers/employee.controller.js";
import { dashboard } from "../controllers/employer.controller.js";
import path from "path";
import { fileURLToPath } from 'url';
const employeeRouter = express.Router();

// Middleware for checking the role of the user
const checkRole = (req, res, next) => {
    if (req.user.role !== 'employee') {
        return res.status(403).send('Access denied');
    }
    next();
    // res.sendFile(path.join(__dirname, 'employer.html'));
}

// Resolve __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// employeeRouter.use(checkRole());

// Get Route to send the employee dashboard. 
employeeRouter.get("/", checkRole, async (req, res) => {
    try {
        const user = req.user;
        console.log(user);
        // Adjust the path to point to the correct location
        const filePath = path.join(__dirname, "..", "public", "EmployeeDashoard.html");
        return res.sendFile(filePath);

    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
})
employeeRouter.post("/task", checkRole, addTask)   // Create a Task. 
employeeRouter.get("/task", checkRole, getTasks)   // Get Tasks . 
employeeRouter.put("/task/:taskId", checkRole, updateTasks)   // Update Task 
employeeRouter.delete("/task/:taskId", checkRole, deleteTask)  // Delete a Task . 


//Exporting the employeeRouter.
export default employeeRouter;