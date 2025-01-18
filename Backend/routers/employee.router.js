import express from "express";
import { addTask, deleteTask, updateTasks, getTasks } from "../controllers/employee.controller.js";

const employeeRouter = express.Router();

const checkRole = (req, res) => {
    if (req.user.role !== 'employee') {
        return res.status(403).send('Access denied');
    }
    next();
    // res.sendFile(path.join(__dirname, 'employer.html'));
}


// employeeRouter.use(checkRole());

employeeRouter.get("/", checkRole,)
employeeRouter.post("/task", checkRole, addTask) // Create a Task. 
employeeRouter.get("/task", checkRole, getTasks) // Create a Task. 
employeeRouter.put("/task/:taskId", checkRole, updateTasks) // Create a Task. 
employeeRouter.delete("/task/:taskId", checkRole, deleteTask)

export default employeeRouter;