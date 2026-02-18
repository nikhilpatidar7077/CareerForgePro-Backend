const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth.routes");
const resumeRouter = require("./routes/resume.routes");
const jdAnalyzeRouter = require("./routes/jdAnalyze");
const cors = require("cors");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/auth",authRouter)
app.use("/api/resume",resumeRouter)
app.use("/api/jd",jdAnalyzeRouter)

app.get("/",(req,res)=>{
    res.send("CareerForge Pro in running")
});

app.listen(process.env.PORT,()=>{
console.log(`server running on port ${process.env.PORT}`)
});