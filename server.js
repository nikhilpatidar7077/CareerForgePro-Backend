const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth.routes");
const cors = require("cors");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/auth",authRouter)

app.get("/",(req,res)=>{
    res.send("CareerForge Pro in running")
});

app.listen(process.env.PORT,()=>{
console.log(`server running on port ${process.env.PORT}`)
});