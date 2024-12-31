const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const { User } = require("../models/userModel");


dotenv.config();
const MONGO_URL = process.env.MONGODB_URL;
let client;

async function connectClient() {
    if (!client) {
        client = new MongoClient(MONGO_URL);
        await client.connect();
    }
}


const getAllUsers = (req, res) => {
    res.send("all repository");
};

async function signUp(req, res) {
    const { username, email, password } = req.body;

    try {
        await connectClient();
        const db = client.db("myGit");
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({ username });

        if (user) {
            return res.status(400).json({ message: "user already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const userData = {
            username: username,
            email: email,
            password: hashPassword,

            repository: [],
            followedUsers: [],
            starRepository: []
        }

        const result = await userCollection.insertOne(userData);

        const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.json(token);
    }
    catch (err) {
        console.log("Error during signup", err.message);
        res.status(500).send("Server Error");
    }
};

async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        await connectClient();
        const db = client.db("myGit");
        const userCollection = db.collection("users");

        const findUser = await userCollection.findOne({ email });
        if(!findUser){
            res.status(500).json({message: "Invalid Credential"});
        }
        const isMatchPass = await bcrypt.compare(password, findUser.password);

        if (isMatchPass) {
            const token = jwt.sign({id:findUser._id}, process.env.JWT_SECRET, { expiresIn:"1h" });
            res.json({ token, userId : findUser._id});
        }

    } catch (error) {
        console.log("Error during login :", err.message);
        res.status(500).send("server erro");
    }

};

const getUserProfile = (req, res) => {
    res.send("user profile");
};

const updateUserProfile = (req, res) => {
    res.send("Profile Updated Successfull");
};

const deleteUser = (req, res) => {
    res.send("Profle deleted successfull");
}

module.exports = {
    getAllUsers,
    signUp,
    signIn,
    getUserProfile,
    updateUserProfile,
    deleteUser
}


