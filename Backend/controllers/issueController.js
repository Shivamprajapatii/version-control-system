const Issue = require("../models/issueModel");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

async function createIssue( req, res){
    const { title, description } = req.body;
    const id = req.params; // repository ID(kon se repo ke liye ham issue create kar rhe hain);

    try {
        const issue = new Issue({
            title : title,
            description : description,
            repository : id,
        })
       const issesData = await issue.save();

    } catch (error) {
         console.log("Error During creation of Issue Data", error.message);
        res.status(500).send("Server Error");
    }

}

async function updateIssueById( req, res){
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        const issue = await Issue.findById(id);
        if(!issue){
            return res.status(404).json({error:"Issue not found!"});
        }
        issue.title = title;
        issue.description = description;
        issue.status = status;

        await issue.save();

        res.json(issue);

    } catch (error) {
        console.log("Error During update issue", error.message);
        res.status(500).send("Server Error");
    }
}

async function deleteIssueById( req, res) {
    const { id } = req.params;

    try {
        const issue = await Issue.findByIdAndDelete(id);

        if(!issue){
            return res.status(404).json({error:"Issue not found!"});
        }

        res.json({message :"Issue Deleted"});

    } catch (error) {
        console.log("Error During update issue by id", error.message);
        res.status(500).send("Server Error");
    }
}

async function allIssue(req,res) {
    const { id } = req.params;

    try {
        const issue = await Issue.find({repository : id});

        if(!issue){
            return res.status(404).json({error:"Issue not found!"});
        }

        res.status(200).json(issue);
        
    } catch (error) {
        console.log("Error During fetching all issue", error.message);
        res.status(500).send("Server Error");
    }
}

async function getIssuesById(req, res) {
    const { id } = req.params;

    try {
        const issue = await Issue.findById(id);
        if(!issue){
            return res.status(404).json({error:"Issue not found!"});
        }

        res.json(issue);

    } catch (error) {
        console.log("Error During fetchig issue by Id", error.message);
        res.status(500).send("Server Error");
    }
}

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    allIssue,
    getIssuesById
}