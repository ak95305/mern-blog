import express from "express";
import cors from "cors";
import "./loadEnviroment.mjs";
import blog from "./routes/blog.mjs";

const PORT = process.env.port || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", blog);

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
});