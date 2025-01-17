import express from "express";
const employeeRouter = express.Router();


employeeRouter.get("/", (req, res) => {
    res.send("sdfghjk");
})

export default employeeRouter;