import express from "express";
import { addEmployee } from "../controllers/employer.controller.js";
const employerRouter = express.Router();


const checkRole = (req, res) => {
    if (req.user.role !== 'employer') {
        return res.status(403).send('Access denied');
    }
    next();
    // res.sendFile(path.join(__dirname, 'employer.html'));
}


employerRouter.get("/", checkRole )

employerRouter.post("/addEmployee", addEmployee);

export default employerRouter;