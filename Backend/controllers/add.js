const fs = require("fs").promises;
const path = require("path")

async function addRepo(filePath) {
    const repoPath = path.resolve(process.cwd(), ".myGit");
    const stagingPath = path.join(repoPath, "staging");

    try {
        await fs.mkdir(stagingPath, {recursive : true});
        const fileName = path.basename(filePath);
        fs.copyFile(filePath, path.join(stagingPath, fileName));
        console.log(`File ${fileName} added to the staging area`);
        
    } catch (error) {
        console.log("Error during adding file", error);
    }
}

module.exports = { addRepo };