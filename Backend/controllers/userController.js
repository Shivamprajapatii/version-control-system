const getAllUsers = (req,res) => {
    res.send("all repository");
};

const signUp = (req,res) => {
    res.send("signup successfully");
};

const signIn = (req,res) => {
    res.send("signin successfully");
};

const getUserProfile = (req,res) => {
    res.send("user profile");
};

const updateUserProfile = (req,res) => {
    res.send("Profile Updated Successfull");
};

const deleteUser = (req,res) => {
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


