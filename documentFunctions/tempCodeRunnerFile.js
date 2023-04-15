const fs = require("fs");
const PruneCorpus = require("../utilityFunctions/stopWordRemover").PruneCorpus;
// Read json from pressRelease
var pressRelease = JSON.parse(fs.readFileSync("./corpus/ScrappedPressRelease.json", "utf-8"));