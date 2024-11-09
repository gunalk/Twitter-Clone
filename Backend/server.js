
import express from 'express';
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import connectDB from './db/connectDb.js';

dotenv.config();

const app = express();


const PORT = process.env.PORT || 5000
app.use(express.json());


app.get("/", (req, res) => {
    res.send('Hello World!');
});


app.use("/api/auth", authRoute);


const startServer = async () => {
    try {
        await connectDB(); 
        console.log("MongoDB connected successfully");
        
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
        process.exit(1); // Exit if the database connection fails
    }
};

// Start the server
startServer();
