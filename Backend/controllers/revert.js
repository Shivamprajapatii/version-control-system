const fs = require("fs");
const path = require("path");
const { promisify } = require("util"); // util is an node api which allow to check existing things(agar koi commit hai it which maches first )


const readDir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function revertRepo(commitID) {
    const repoPath = path.resolve(process.cwd(), ".myGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        const commitDir = path.join(commitsPath, commitID);
        const files = await readDir(commitDir);  //  agar is point pe fail hua toh means aisa koi folder ya file exist nahi karta hai
        const parentDir = path.resolve(repoPath, ".."); // if folder mil jata hai toh use parent directory me move kar den (.. means 1 step back to the folder)

        for (const file of files) {
            await copyFile(path.join(commitDir, file), path.join(parentDir, file));

            //copying everything from (path.join(commitDir,file) parent folder to this folder path.join(parentDir,files)
        }

        console.log(`commit ${commitID} reverted successfully!`);

    } catch (error) {
        console.log("unable to revert :", error);
    }
}

module.exports = { revertRepo };