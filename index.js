import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./schema/user_schema.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config()


const port = 3000;

const db = process.env.DB_URL;
const username = process.env.USER_NAME;
const password = process.env.USER_PASSWORD;




mongoose
.connect(db,{
    useNewurlParser: true,
    useUnifiedTopology: true,
})
.then(()=> {
    console.log("Connected to MongoDB");
})

.catch((err) => {
    console.log(err);
});





app.get("/users", async(request,response) => {
    const userModel = await UserModel.find({});
    if (userModel) {
        return response.status(200).json({
            status: true,
            messsage: "User fetched successfully",
            data: userModel
        });  
     }else {
         return response.status(400).json({
             status: false,
             messsage: "Users not found",
         });
     }
});






app.get("/users/:id", async(request,response) => {
    const{status} = request.params;

    const userModel = await UserModel.find({}).where('status').equals(status);
    if (userModel) {
        return response.status(200).json({
            status: true,
            messsage: "Users fetched successfully",
            data: userModel
        });  
     }else {
         return response.status(400).json({
             status: false,
             messsage: "Users not found",
         });
     }
});




app.post("/user", async(request,response) => {
    const {first_name,last_name,date_of_birth,school} = request.body;

    const userModel = await UserModel.create({
        first_name,
        last_name,
        date_of_birth,
        school,
    });


    if (userModel) {
        return response.status(201).json({
            status: true,
            message: "Users create",
            date: userModel,
        });
    }else {
        return response.status(400).json({
            status: false,
            message: "users failed to create",
        })
    }

});



app.listen(port, () => console.log('Hey! Welcome to our page ${port}!'));
