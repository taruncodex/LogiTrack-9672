<<<<<<< HEAD
import User from "../models/employee.model.js";
=======
import User from "../models/User.model.js";
>>>>>>> soumen
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import "dotenv/config";


<<<<<<< HEAD

const generateOtp = () => Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;


=======
// Function to Generate the OTP
const generateOtp = () => Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

// Transporter for nodemailer
>>>>>>> soumen
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_USER_PASS,
    },
});


<<<<<<< HEAD

export const signUpUser = async (req, res) => {
    try {

        const { email, name, password, department } = req.body;

=======
// SignUp Logic for Employer
export const signUpUser = async (req, res) => {
    try {

        // Get data from the user
        const { email, name, password, department } = req.body;

        // Verify if user enter the fields or not
>>>>>>> soumen
        if (!email || !name || !password) {
            return res.status(400).json({ msg: "email , name and password are required." })
        }

        console.log(email, name, password, department);

<<<<<<< HEAD
        const chechUser = await User.findOne({ email });

=======
        // Check is the user is already in the system
        const chechUser = await User.findOne({ email });
>>>>>>> soumen
        if (chechUser) {
            console.log("user already exist with this email");
            return res.status(400).json({ message: "user had signed up already" });
        }

<<<<<<< HEAD
        const hashPassword = await argon2.hash(password);

=======
        // Hash the password
        const hashPassword = await argon2.hash(password);

        // Create the Employee record
>>>>>>> soumen
        const user = new User({
            name,
            email,
            password: hashPassword,
            department,
        });
<<<<<<< HEAD

        await user.save();

        res.status(201).json({
=======
        // Save the record
        await user.save();

        // Send the success response.
        return res.status(201).json({
>>>>>>> soumen
            message: "Signup successful"
        })

    } catch (error) {
        console.log(error.message);
        res.status(401).json({ message: "Invalid credentials", error: error.message });
    }
}



export const loginUser = async (req, res) => {
    try {
<<<<<<< HEAD
        const { email, password } = req.body;

=======

        const { email, password } = req.body;

        // Check if email and password entered currectly 
>>>>>>> soumen
        if (!email || !password) {
            return res.status(400).json({ msg: "email and password  are required" });
        }

<<<<<<< HEAD
=======
        // Check if user exist in the system or not 
>>>>>>> soumen
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`No employee exists with this email${email}`);
            return res
                .status(400)
                .json({ message: "Incorrect email or password" });
        }

<<<<<<< HEAD
        // converting into the json string
=======
        // Hashing the Password
>>>>>>> soumen
        const isValidUser = await argon2.verify(user.password, password);

        if (!isValidUser) {
            console.log("Incorrect password");
            return res.status(400).json({ message: "Incorrect email or password", error: error.message });
        }

<<<<<<< HEAD
        // Creating accesToken
=======
        // Creating accessToken Token
>>>>>>> soumen
        const accessToken = jwt.sign(
            { id: user._id, name: user.name, role: user.role },
            process.env.JWT_ACCESS_PASS,
            { expiresIn: "1h" }
        );

        // Creating refreshToken
        const refreshToken = jwt.sign(
            { id: user._id, name: user.name },
            process.env.JWT_REFRESH_PASS,
            { expiresIn: "7d" }
        );

        // adding accessToken into the cookie 
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
<<<<<<< HEAD
            secure: true,
=======
            secure: false,
>>>>>>> soumen
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });

        // adding refreshToken into the cookie 
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
<<<<<<< HEAD
            secure: true,
=======
            secure: false,
>>>>>>> soumen
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        console.log(accessToken);
        console.log(req.cookies.accessToken);
        console.log(refreshToken);
        console.log(user.role);

        // Send role of the user with success message. 
        res.status(200).json({ message: "login successful", role: user.role });

    } catch (error) {
        console.log(error.message);
        res.status(401).json(error.message);
    }
}

export const forgotPassword = async (req, res) => {
    try {
<<<<<<< HEAD
        const { email } = req.body;

        const user = await User.findOne({ email });

=======
        // Take the Email the from the user
        const { email } = req.body;
        // Find the user 
        const user = await User.findOne({ email });
        // If user is not present 
>>>>>>> soumen
        if (!user) {
            console.log("user is not present in database with this email");
            return res
                .status(400)
                .json({ message: "user not exist for this email" });
        }

<<<<<<< HEAD
        const resetToken = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_RESET_PASS, { expiresIn: "5m" });

        const OTP = generateOtp();

        await transporter.sendMail({
            to: email,
            from: "udemy@gmail.com",
=======
        // Create the resetToken 
        const resetToken = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_RESET_PASS, { expiresIn: "5m" });

        // Get the OTP
        const OTP = generateOtp();

        // Otp to the user Mail 
        await transporter.sendMail({
            to: email,
            from: "LogiTrack@gmail.com",
>>>>>>> soumen
            subject: "Forgot Password OTP for LogiTask ",
            html: `<p>OTP for Forgot Password on LogiTask </p>
            <P>This OTP is valid for 5 minutes.</p>
            <h2>${OTP}</h2>`,
        });

<<<<<<< HEAD
=======
        // Create the resetToken 
>>>>>>> soumen
        res.cookie("resetToken", resetToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 5 * 60 * 1000,
        });

<<<<<<< HEAD
        res.status(200).json({
=======
        // Return the response
        return res.status(200).json({
>>>>>>> soumen
            message: "OTP has been send successfully",
            OTP,
        });

    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }

}

<<<<<<< HEAD
export const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;

=======
// Logic for ResetPassword 
export const resetPassword = async (req, res) => {
    try {
        // get the password 
        const { password } = req.body;
        // get resetToken from the cookies 
>>>>>>> soumen
        const resetToken = req.cookies.resetToken;

        if (!resetToken) {
            console.log("reset token has been deleted from cookies");
            return res
                .status(400)
                .json({ message: "Otp was valid for only 5 minutes" });
        }

<<<<<<< HEAD
        const decode = jwt.verify(resetToken, process.env.JWT_RESET_PASS);

        const user = await User.findOne({ _id: decode.id });

        const hashPassword = await argon2.hash(password);

        user.password = hashPassword;

        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
=======
        // decode the resetToken  
        const decode = jwt.verify(resetToken, process.env.JWT_RESET_PASS);

        // Get the user record from its id.
        const user = await User.findOne({ _id: decode.id });

        // Hash the Password
        const hashPassword = await argon2.hash(password);

        // Save the password
        user.password = hashPassword;
        await user.save();

        // return the response.
        return res.status(200).json({ message: "Password updated successfully" });
>>>>>>> soumen

    } catch (error) {
        console.log("Invalid reset token");
        res.status(400).json({ message: "Something went wrong" });
    }
}


// MiddleWare to check for the token.
export const checkForToken = async (req, res, next) => {
    console.log("Enterd in tokenVarification.");

<<<<<<< HEAD
    const accessToken = req.cookies.accessToken;
    console.log("Request headers:" ,  req.headers);
    console.log(accessToken);

=======
    // Get the accessToken from the cookies
    const accessToken = req.cookies.accessToken;
    console.log("Request headers:", req.headers);
    console.log("All cookies:", accessToken);

    // If accessToken is present then decode it and get the user data from it and save into the req.user
>>>>>>> soumen
    if (accessToken) {
        try {
            console.log("In the If Part")
            const decode = jwt.verify(accessToken, process.env.JWT_ACCESS_PASS);

            const user = await User.findOne({ _id: decode.id });

            req.user = user;

            next();

        } catch (error) {
            console.log("invalid access token");
            res.status(401).json({ message: "Unauthorized Access", error: error.message });
        }
<<<<<<< HEAD
    } else {
        console.log("In the else Part")
        try {
=======
    }

    // If accesstoken is not present then use refresh token to create the accesstoken
    else {
        console.log("In the else Part")
        try {

            // Get the refreshToken
>>>>>>> soumen
            const refreshToken = req.cookies["refreshToken"];
            console.log("refreshToken", refreshToken);

            if (!refreshToken) {
                console.log("Neither Access nor Refresh token is present");
                return res.status(401).json({ message: "Unauthorized Access" });
            }

<<<<<<< HEAD

            const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_PASS);

            console.log(decode);
=======
            // Decode the the refreshToken 
            const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_PASS);

            console.log(decode);

            // Create a new accessToken 
>>>>>>> soumen
            const newAccessToken = jwt.sign(
                { id: decode.id, name: decode.name },
                process.env.JWT_ACCESS_PASS,
                { expiresIn: "1h" }
            );

<<<<<<< HEAD
=======
            // Save the accessToken in to cookie
>>>>>>> soumen
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 1000,
            });

<<<<<<< HEAD
            const user = await User.findOne({ _id: decode.id });

            req.user = user;

=======
            // Get the data from the mongo
            const user = await User.findOne({ _id: decode.id });
            // save the user record into the req.user.
            req.user = user;

            // After all checks go for the next response handler
>>>>>>> soumen
            next();

        } catch (error) {
            console.log("invalid refresh token");
            res.status(401).json({ message: "Unauthorized Access", error: error.message });
        }
    }

}