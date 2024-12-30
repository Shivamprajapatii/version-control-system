const createIssue = ( req, res) => {
    res.send("Issues created successfully");
}

const updateIssueById = ( req, res) => {
    res.send("issue update successfully");
}

const deleteIssueById = ( req, res) => {
    res.send("issue deleted successfully");
}

const allIssue = (req,res) => {
    res.send("all issue fetched successfully");
}

const getIssuesById = (req, res) => {
    res.send("Issue Details fetched");
}

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    allIssue,
    getIssuesById
}