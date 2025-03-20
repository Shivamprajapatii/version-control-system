const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");



dotenv.config();
const MONGO_URL = process.env.MONGODB_URL;
let client;

async function connectClient() {
    if (!client) {
        client = new MongoClient(MONGO_URL);
        await client.connect();
    }
}


async function getAllUsers(req, res) {

    try {
        await connectClient();
        const db = client.db("myGit");
        const userCollection = db.collection("users");

        const users = await userCollection.find({}).toArray();
        res.json(users);
    } catch (error) {
        console.log("Error During fetching Data", error.message);
        res.status(500).send("Server Error");
    }

};

async function signUp(req, res) {
    const { username, email, password, imageUrl } = req.body;

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
            imageUrl,
            repository: [],
            followedUsers: [],
            starRepository: []
        }

        const result = await userCollection.insertOne(userData);

        const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.json({token, userId : result.insertedId.toHexString()});
        
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
        if (!findUser) {
            res.status(500).json({ message: "Invalid Credential" });
        }
        const isMatchPass = await bcrypt.compare(password, findUser.password);

        if (!isMatchPass) {
           return res.json({
              message : "Wrong Credianls",
           })
        }
        const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, userId: findUser._id });

    } catch (error) {
        console.log("Error during login :", error.message);
        res.status(500).send("server erro")
    }

};


async function getUserProfile(req, res) {
    const currentId = req.params.id;

    try {
        await connectClient();
        const db = client.db("myGit");
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({
            _id: new ObjectId(currentId)
        });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.send(user);

    } catch (error) {
        console.log("Error During fetching Data", error.message);
        res.status(500).send("Server Error");
    }

};

async function updateUserProfile(req, res) {
    const currentId = req.params.id;
    const { email, password } = req.body;

    try {
        await connectClient();
        const db = client.db("myGit");
        const userCollection = db.collection("users");

        let updatedField = { email };
        if (password) {
            const hashPassword = await bcrypt.hash(password, 10);
            updatedField.password = hashPassword;
        }
        console.log(updatedField);
        const result = await userCollection.findOneAndUpdate(
            { _id: new ObjectId(currentId) }, // Convert ID to ObjectId
            { $set: updatedField }, 
            { ReturnDocument : "after" }
        );

        console.log(result);

        if (!result.value) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.send(result.value);

    } catch (error) {
        console.log("Error During Update Data", error.message);
        res.status(500).send("Server Error");
    }

};

async function deleteUser(req, res) {
    const currentId = req.params.id;

    try {
        await connectClient();
        const db = client.db("myGit");
        const userCollection = db.collection("users");


        const result = await userCollection.deleteOne({
            _id: new ObjectId(currentId),
        });

        if (!result.deleteCount == 0) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.json({message : "User Profile Deleted"});

    } catch (error) {
        console.log("Error During delete user Data", error.message);
        res.status(500).send("Server Error");
    }
}

module.exports = {
    getAllUsers,
    signUp,
    signIn,
    getUserProfile,
    updateUserProfile,
    deleteUser
}


