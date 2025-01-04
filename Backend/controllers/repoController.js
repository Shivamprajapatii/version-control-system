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

    try {
        const repository = await Repository.find({}).populate("owner").populate("issues");
        res.status(200).json(repository);
    } catch (error) {
        console.log("Error During fetching all repository", error.message);
        res.status(500).send("Server Error");
    }

};

async function fetchRepositoryById(req, res) {
    const { id } = req.params;
   
    try {
        const repository = await Repository.find({_id: id }).populate("owner").populate("issues");

        res.json(repository);

    } catch (error) {
        console.log("Error During fetching repository by ID", error.message);
        res.status(500).send("Server Error");
    }
};

async function fetchRepositoryByName(req, res) {  // searching feature is done here
    const name = req.params.name;
   
    try {
        
        const repository = await Repository.find({ name : name }).populate("owner").populate("issues");
        res.json(repository);

    } catch (error) {
        console.log("Error During fetching repository by Name", error.message);
        res.status(500).send("Server Error");
    }
};

async function fetchRepositoryForCurrentUser(req, res) {
    const {userId } = req.params;
    
    try {
        const repositories = await Repository.find({ owner : userId });
        if(!repositories || repositories.length == 0){
            return res.status(404).json({error:"User repository not found"});
        }
        res.json({message :"Repository found", repositories});

    } catch (error) {
        console.log("Error During fetching user repositories", error.message);
        res.status(500).send("Server Error");
    }
};

async function updateRepositoryById(req, res) {
    const id = req.parms.id;
    const { contant, description } = req.body;

    try {
        const repository = await Repository.findById(id);
        if(!repository ){
            return res.status(404).json({error:"repository not found"});
        }

        repository.contant = contant;
        repository.description = description;
        const updatedRepository = await repository.save();

        res.json({
            message : "Repository updated successfull",
            repository : updatedRepository,
        })

    } catch (error) {
        console.log("Error During update repository", error.message);
        res.status(500).send("Server Error");
    }
};

async function toggleVisiblityById(req, res) {
    const id = req.parms.id;

    try {
        const repository = await Repository.findById(id);
        if(!repository ){
            return res.status(404).json({error:"repository not found"});
        }

        repository.visiblity = !repository.visiblity; // agar true toh false if false to true
        const updatedRepository = await repository.save();

        res.json({
            message : "Repository visiblity toggled successfull",
            repository : updatedRepository,
        })

    } catch (error) {
        console.log("Error During togling visiblity repository", error.message);
        res.status(500).send("Server Error");
    } 
};

async function deleteRepositoryById(req, res) {
    const id = req.parms.id;

    try {
        const repository = await Repository.findByIdAndDelete(id);
        if(!repository ){
            return res.status(404).json({error:"repository not found"});
        }

        res.json({message : "Repository Deleted Successfully!"});

    } catch (error) {
        console.log("Error During  Deleting repository", error.message);
        res.status(500).send("Server Error");
    }
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