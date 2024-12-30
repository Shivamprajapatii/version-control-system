const express = require("express");
const userController = require("../controllers/userController");


const userRouter = express.Router();

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.post("/signup", userController.signUp);
userRouter.post("/signin", userController.signIn);
userRouter.get("/userProfile", userController.getUserProfile);
userRouter.put("/updateProfile", userController.updateUserProfile);
userRouter.delete("/deleteProfile", userController.deleteUser);

module.exports = userRouter;