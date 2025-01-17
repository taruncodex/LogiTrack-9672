import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";
import { dbConnection } from "./config/dbConnection.js";
import morgan from "morgan";
import employeeRouter from "./routers/employee.router.js";
import employerRouter from "./routers/employer.router.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use("/tasks", employeeRouter);
app.use("/employer", employerRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await dbConnection();
    console.log(`Server started at http://localhost:${PORT} and https://udemy-j08o.onrender.com`);
});
