import User from "../models/User.model.js";

// Add a new Employee to the system 
export const addEmployee = async (req, res) => {
    try {

        // Get the employee data from the Employer
        const { email, name, password, department, jobTitle } = req.body;

        if (!email || !name || !password || !department || jobTitle) {
            return res.status(400).json({ msg: "email , name and password are required." })
        }

        console.log(email, name, password, department);

        // check if this email is already in use
        const checkUser = await User.findOne({ email });

        if (checkUser) {
            console.log("user already exist with this email");
            return res.status(400).json({ message: "This employee is already in the system." });
        }

        // Hash the passsword 
        const hashPassword = await argon2.hash(password);

        // Create the new employee record 
        const user = new User({
            name,
            email,
            password: hashPassword,
            department,
            jobTitle,
            role: "employee",
            status: "active",

        });

        // Save the employee record
        await user.save();

        // Send the success Response
        return res.status(201).json({
            message: "Employee Added Successfully."
        })

    } catch (error) {
        return res.status(500).json({ msg: "Internal server Error", error: error.message });
    }

}



export const dashboard = async (req, res) => {

    try {

    } catch (error) {
        return res.status(500).json({ msg: "Internal server Error", error: error.message });
    }
}