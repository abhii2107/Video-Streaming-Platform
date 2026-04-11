// require('dotenv').config({path: './env'})
import dotenv from "dotenv" // this dotenv means thjat all env variables are sent to the files
import connectDB from "./db/index.js";

dotenv.config({
    path: '.env'
})

connectDB()







// import express from "express"
// const app = express();


// //  iife

// ( async () => { 
//     try {
//         mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("ERROR",error);
//             throw error
//         })
//         app.listen(process.env.PORT,() => {
//             console.log(`App is listening on port${process.env.PORT}`);
            
//         })
//     } catch (error) {
//         console.log("Error:", error)
//         throw error;
//     }
// })()