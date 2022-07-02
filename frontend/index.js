import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import ApplicationRoutes from "./Routes/ApplicationRoutes.js"
import cookieParser from "cookie-parser";
import 'dotenv/config'
const app = express();

const url = `mongodb+srv://aneesyasin:${process.env.dbpassword}@cluster0.tgxf5z9.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(
    ()=>console.log("db conntected succesfully")
);


const port=process.env.PORT ||5000;

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
    app.use(express.static("FrontendFinal/build"));
}

app.listen(port);   
app.use(cookieParser());
app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(express.json());
app.use(bodyParser.json({ extended:true }));
app.use(bodyParser.urlencoded({extended:true}));
app.use("/hostelapp",ApplicationRoutes);
