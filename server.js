const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());

// Get IR Files
const GenerateQueryMap = require("./queryFunctions/processQuery");
const GetMatch = require("./utilityFunctions/matchedWordMap");
displayCorpus = JSON.parse(fs.readFileSync("./corpus/displayCorpus.json", "utf-8"));

app.get("/", (req, res) => {
  GenerateQueryMap(req.query.query);
  setTimeout(() => {
    // Get Matched Documents
    matchedDocuments = [];
    GetMatch().forEach((match) => {
      matchedDocuments.push(displayCorpus[match[0]]);
    });
    res.send(matchedDocuments.slice(0, 5));
  }, 5);
});

app.listen(2222, () => {
  console.log("Server is listening");
});
