const express = require("express");
const userController = require("../controllers/userController");


const userRouter = express.Router();

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.post("/signup", userController.signUp);
userRouter.post("/signin", userController.signIn);
userRouter.get("/userProfile/:id", userController.getUserProfile);
userRouter.put("/updateProfile/:id", userController.updateUserProfile);
userRouter.delete("/deleteProfile/:id", userController.deleteUser);

module.exports = userRouter;