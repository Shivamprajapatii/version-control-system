const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const Issue = require("../models/issueModel");
const User = require("../models/userModel");


async function createRepository(req, res) {
    const { name, description, contant, visiblity, owner, issues } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ error: "Repository name is required!" });
        }
        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ error: "Invalid user ID!" });
        }

        const newRepository = new Repository({
            name,
            description,
            contant,
            visiblity,
            owner,
            issues
        });

        const result = await newRepository.save();
        res.status(201).json({ message: "Repository Created!", repositoryId: result._id });

    } catch (error) {
        console.log("Error During creating of repository", error.message);
        res.status(500).send("Server Error");
    }
};

async function getAllRepository(req, res) {
    res.send({ message: "all repository fetched", Description: "All right hope you are doing well!" });
};

async function fetchRepositoryById(req, res) {
    res.send("Repository detais fetched");
};

async function fetchRepositoryByName(req, res) {  // searching feature is done here
    res.send("Repository detais fetched");
};

async function fetchRepositoryForCurrentUser(req, res) {
    res.send("Repository for logedIn User fetched");
};

async function updateRepositoryById(req, res) {
    res.send("Repository Updated");
};

async function toggleVisiblityById(req, res) {
    res.send("Visiblity Toggled");
};

async function deleteRepositoryById(req, res) {
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