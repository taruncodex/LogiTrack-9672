import express from "express";
import { addEmployee, dashboard } from "../controllers/employer.controller.js";
import { checkForToken } from "../controllers/auth.controller.js";


const employerRouter = express.Router();

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
        const user = req.user;
        return res.status(200).json({ user })
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
});


employerRouter.post("/addEmployee", checkForToken, addEmployee);

export default employerRouter;