import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";
import { dbConnection } from "./config/dbConnection.js";
import morgan from "morgan";
import employeeRouter from "./routers/employee.router.js";
import employerRouter from "./routers/employer.router.js";
import { checkForToken, forgotPassword, loginUser, resetPassword, signUpUser } from "./controllers/auth.controller.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));


// Sign-Up Route 
app.post("/signUp", signUpUser);
// Login Route
app.post("/login", loginUser);
// forget password
app.post("/forgot-password", forgotPassword);
// reset password
app.post("/reset-password", resetPassword)



// if the user is employee send to /employee route  
app.use("/employee", checkForToken, employeeRouter);
// if user is employer then send him to /employer route
app.use("/employer", checkForToken, employerRouter);




const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await dbConnection();
    console.log(`Server started at http://localhost:${PORT} and https://udemy-j08o.onrender.com`);
});
