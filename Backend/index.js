import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";
import { dbConnection } from "./config/dbConnection.js";  // Connecting db 
import morgan from "morgan";
import employeeRouter from "./routers/employee.router.js";
import employerRouter from "./routers/employer.router.js";
import { checkForToken, forgotPassword, loginUser, resetPassword, signUpUser } from "./controllers/auth.controller.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();


// Middlewares  
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


// Resolve __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Serve static files (optional)
app.use(express.static('public'));



// Sign-Up Route for employer. 
app.get("/signup", async (req, res) => {
    try {
       return res.sendFile(path.join(__dirname, 'public', 'signup.html'));
    } catch (error) {
        return res.status(500).json({ msg: "Internal server Error." })
    }
});


app.post("/signup", signUpUser);

// Login Route
app.get("/login", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    } catch (error) {
        return res.status(500).json({ msg: "Internal server Error." })
    }
});
app.post("/login", loginUser);
// forget password
app.post("/forgot-password", forgotPassword);
// reset password
app.post("/reset-password", resetPassword)



// if the user is employee send to /employee route  
app.use("/employee", checkForToken, employeeRouter);
// if user is employer then send him to /employer route
app.use("/employer", checkForToken, employerRouter);



// Connecting the mongoDB and listen at port 
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await dbConnection();
    console.log(`Server started at http://localhost:${PORT} and https://udemy-j08o.onrender.com`);
});
