const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config");

async function pullRepo() {
    const repoPath = path.resolve(process.cwd(),".myGit");
    const commitPath = path.join(repoPath, "commits");

    try {
        const data = await s3.listObjectsV2(
            {
                Bucket : S3_BUCKET,
                Prefix : "commits/"
            })
        .promise();
        
        const objects = (await data).Contents;
        for(const object of objects){
            const key = object.Key;
            const commitDir = path.join(
                commitPath,
                path.dirname(key).split("/").pop()
            );

            await fs.mkdir(commitDir, {recursive : true});

            const params = {
                Bucket : S3_BUCKET,
                Key : key,
            };

            const fileContent = await s3.getObject(params).promise();
            await fs.writeFile(path.join(repoPath, key), fileContent.Body);

            console.log("All commit pull from S3");
        } 

    } catch (error) {
        console.log("Unable to pull : ",error);
    }
}

module.exports = { pullRepo };