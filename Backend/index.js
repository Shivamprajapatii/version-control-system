const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");


yargs(hideBin(process.argv))
//  Command One
  .command(
    "init",
    "Initialize a new Repository",
    {},
    initRepo 
  )

//  add  Command two 
  .command(
    "add <file>", 
    "Add a file to the repositories",
    (yargs) => {
        yargs.positional("file", {
            description : "File to add to the staging area",
            type :'string'
        });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )
// commit Command third 
   .command(
    "commit <messgae>",
    "Commit the staged file",
    (yargs) => {
        (yargs).positional("message", {
            description:"commit message",
            type : "string"
        })
    },
    commitRepo
   )
// fourth command
   .command(
    "push",
    "Push commit to the amzon S3",
    {},
    pushRepo
   )

// fifth command
   .command(
    "pull",
    "Pull commit from S3 Bucket",
    {},
    pullRepo
   )

// sixth command
  .command(
    "revert <commitID>",
    "Revert to specific commit",
    (yargs) => {
        (yargs).positional("commitID", {
            description: "commit ID to revert to",
            type : "string"
        })
    }
    ,
    revertRepo
  )   

  .demandCommand(1, "You nedd at least one command")
  .help() // Adds a help command for user assistance
  .argv; // Parses the arguments