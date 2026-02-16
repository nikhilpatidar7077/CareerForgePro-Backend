const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const app = express();
dotenv.config();
connectDB();

app.get("/",(req,res)=>{
    res.send("CareerForge Pro in running")
});

app.listen(process.env.PORT,()=>{
console.log(`server running on port ${process.env.PORT}`)
});