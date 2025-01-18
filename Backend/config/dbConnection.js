import { connect } from "mongoose";
import "dotenv/config";

const DB_URL = process.env.DB_URL;

// Connecting db 
async function dbConnection() {
    try {
        await connect(DB_URL);
        console.log("Database connected successfuly");
    } catch (error) {
        console.log(error.message);
    }
}

export { dbConnection };