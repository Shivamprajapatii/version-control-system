const createRepository = (req, res) => {
    res.send("Repository created");
};

const getAllRepository = (req, res) => {
    res.send({message: "all repository fetched",Description:"All right hope you are doing well!"});
};

const fetchRepositoryById = (req, res) => {
    res.send("Repository detais fetched");
};

const fetchRepositoryByName = (req, res) => {  // searching feature is done here
    res.send("Repository detais fetched");
};

const fetchRepositoryForCurrentUser = (req, res) => {
    res.send("Repository for logedIn User fetched");
};

const updateRepositoryById = () => {
    res.send("Repository Updated");
};

const toggleVisiblityById = () => {
    res.send("Visiblity Toggled");
};

const deleteRepositoryById = () => {
    res.send("Repository Deletede");
};

module.exports = {
    createRepository,
    getAllRepository,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoryForCurrentUser,
    updateRepositoryById,
    toggleVisiblityById,
    deleteRepositoryById
}