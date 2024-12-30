const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const mainRoter = require("../routes/main.router");

dotenv.config();  // .env file ka data process me jata hai so we can access it 

function startServer() {
    const app = express();
    const PORT = process.env.PORT || 3000;
    const MONGO_URL = process.env.MONGODB_URL;

    mongoose.connect(MONGO_URL)
    .then(() => console.log('Database Connected Successfully!'))
    .catch((err) => {
        console.log("Error while connecting to the mongoDB Database", err);
    });


    app.use(express.json());
    app.use(cors({ origin: '*' }));
    app.use("/", mainRoter);
  
    // Creating Server
    let user = "test";
    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
   
    io.on("connection", (socket) =>{
        socket.on("joinRoom", (userID) => {
           user = userID;
           console.log("===========");
           console.log(user);
           console.log("===========");
           socket.join(userID);
        })
    });

    const db = mongoose.connection;
    db.once("open", async ()=> {
        console.log("CRUD operation called");
        // CRUD Operation
    });
    
    httpServer.listen(PORT, ()=> {
        console.log(`Server is running on PORT ${PORT}`);  
    });

};

module.exports = { startServer };