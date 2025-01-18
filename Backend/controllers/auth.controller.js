import User from "../models/employee.model.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import "dotenv/config";


const generateOtp = () => Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_USER_PASS,
    },
});



export const signUpUser = async (req, res) => {
    try {

        const { email, name, password, department, role } = req.body;

        if (!email || !name || !password || !department || !role) {
            return res.status(400).json({ msg: "email , name and password are required." })
        }

        console.log(email, name, password, department, role);

        const chechUser = await User.findOne({ email });

        if (chechUser) {
            console.log("user already exist with this email");
            return res.status(400).json({ message: "user had signed up already" });
        }

        const hashPassword = await argon2.hash(password);

        const user = new User({
            name,
            email,
            password: hashPassword,
            department,
            role
        });

        await user.save();

        res.status(201).json({
            message: "Signup successful"
        })

    } catch (error) {
        console.log(error.message);
        res.status(401).json({ message: "Invalid credentials", error: error.message });
    }
}



export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "email and password  are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`No employee exists with this email${email}`);
            return res
                .status(400)
                .json({ message: "Incorrect email or password" });
        }

        // converting into the json string
        const isValidUser = await argon2.verify(user.password, password);

        if (!isValidUser) {
            console.log("Incorrect password");
            return res.status(400).json({ message: "Incorrect email or password", error: error.message });
        }

        // Creating accesToken
        const accessToken = jwt.sign(
            { id: user._id, name: user.name },
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
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });

        // adding refreshToken into the cookie 
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        console.log(accessToken);
        console.log(req.cookies.accessToken);
        console.log(refreshToken);

        res.status(200).json({ message: "login successful" });

    } catch (error) {
        console.log(error.message);
        res.status(401).json(error.message);
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            console.log("user is not present in database with this email");
            return res
                .status(400)
                .json({ message: "user not exist for this email" });
        }

        const resetToken = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_RESET_PASS, { expiresIn: "5m" });

        const OTP = generateOtp();

        await transporter.sendMail({
            to: email,
            from: "udemy@gmail.com",
            subject: "Forgot Password OTP for LogiTask ",
            html: `<p>OTP for Forgot Password on LogiTask </p>
            <P>This OTP is valid for 5 minutes.</p>
            <h2>${OTP}</h2>`,
        });

        res.cookie("resetToken", resetToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 5 * 60 * 1000,
        });

        res.status(200).json({
            message: "OTP has been send successfully",
            OTP,
        });

    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }

}

export const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;

        const resetToken = req.cookies.resetToken;

        if (!resetToken) {
            console.log("reset token has been deleted from cookies");
            return res
                .status(400)
                .json({ message: "Otp was valid for only 5 minutes" });
        }

        const decode = jwt.verify(resetToken, process.env.JWT_RESET_PASS);

        const user = await User.findOne({ _id: decode.id });

        const hashPassword = await argon2.hash(password);

        user.password = hashPassword;

        await user.save();

        res.status(200).json({ message: "Password updated successfully" });

    } catch (error) {
        console.log("Invalid reset token");
        res.status(400).json({ message: "Something went wrong" });
    }
}


// MiddleWare to check for the token.
export const checkForToken = async (req, res, next) => {
    console.log("Enterd in tokenVarification.");

    const accessToken = req.cookies.accessToken;
    console.log(accessToken);

    if (accessToken) {
        try {
            console.log("In the If Part")
            const decode = jwt.verify(accessToken, process.env.JWT_ACCESS_PASS);

            const user = await User.findOne({ _id: decode.id });

            req.user = user;

            next();

        } catch (error) {
            console.log("invalid access token");
            res.status(401).json({ message: "Unauthorized Access" });
        }
    } else {
        console.log("In the else Part")
        try {
            const refreshToken = req.cookies["refreshToken"];
            console.log("refreshToken", refreshToken);

            if (!refreshToken) {
                console.log("Neither Access nor Refresh token is present");
                return res.status(401).json({ message: "Unauthorized Access" });
            }


            const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_PASS);

            console.log(decode);
            const newAccessToken = jwt.sign(
                { id: decode.id, name: decode.name },
                process.env.JWT_ACCESS_PASS,
                { expiresIn: "1h" }
            );

            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 1000,
            });

            const user = await User.findOne({ _id: decode.id });

            req.user = user;

            next();

        } catch (error) {
            console.log("invalid refresh token");
            res.status(401).json({ message: "Unauthorized Access" });
        }
    }

}