import User from "../models/employee.model.js";

export const addEmployee = async (req, res) => {
    try {
        const { email, name, password, department, jobTitle } = req.body;

        if (!email || !name || !password || !department || jobTitle) {
            return res.status(400).json({ msg: "email , name and password are required." })
        }

        console.log(email, name, password, department);

        const checkUser = await User.findOne({ email });

        if (checkUser) {
            console.log("user already exist with this email");
            return res.status(400).json({ message: "This employee is already in the system." });
        }

        const hashPassword = await argon2.hash(password);

        const user = new User({
            name,
            email,
            password: hashPassword,
            department,
            jobTitle,
            role: "employee",
            status: "active",

        });

        await user.save();

        res.status(201).json({
            message: "Employee Added Successfully."
        })

    } catch (error) {
        return res.status(500).json({ msg: "Internal server Error", error: error.message });
    }

}


