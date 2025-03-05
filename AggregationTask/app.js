const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const PORT = process.env.PORT || 2000;
const cors = require("cors");
// router
const routes = require("./routes/allRoutes");
// Model
// const clothmodel = require("./models/clothesSchema");

// used to send data from specified origin 
app.use(cors({
    // add this in env 
    origin:process.env.clientPort,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
// middlewares if need to get images from public folder 
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.use(routes);


// server listen 
app.listen(PORT,(err)=>{
    if(err)
        console.log("Error connecting to server",err);
    else
        console.log(`Server is connected at ${PORT}`);
})