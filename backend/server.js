import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contacts" , contactRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


app.listen(3000,()=>{
    console.log("Server is Running on the port 3000");
});