import mongoose from "mongoose";
export const connectDB = async () =>{
try {
  await mongoose.connect("mongodb://localhost:27017/mydatabase");
  console.log("Base de datos enchufada");
} catch (error) {
  console.log(error);
}
}