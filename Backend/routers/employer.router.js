import express from "express";
import { addEmployee, dashboard } from "../controllers/employer.controller.js";
import { checkForToken } from "../controllers/auth.controller.js";
import path from 'path';
import { fileURLToPath } from 'url';

const employerRouter = express.Router();


// Resolve __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware for checking the role of the user
const checkRole = (req, res) => {
    if (req.user.role !== 'employer') {
        return res.status(403).send('Access denied');
    }
    next();
    // res.sendFile(path.join(__dirname, 'employer.html'));
}

//Routes for employer

employerRouter.get("/", checkForToken, checkRole, async (req, res) => {
    try {
        return res.sendFile(__dirname, "public", "employerDashboard.html");
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
});


employerRouter.post("/addEmployee", checkForToken, addEmployee);

export default employerRouter;