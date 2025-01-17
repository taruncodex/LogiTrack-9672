import express from "express";
const employerRouter = express.Router();


employerRouter.get("/", (req, res) => {
    res.send("sdfghjk");
})

export default employerRouter;