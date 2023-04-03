const fs = require("fs");
// Read query word map
query = JSON.parse(fs.readFileSync("./queryFunctions/queryWordMap.json", "utf-8"));

// Read document TFIDF word map
wordMapTFIDF = JSON.parse(fs.readFileSync("./documentFunctions/wordMapTFIDF.json", "utf-8"));

// Read document word map
wordMap = JSON.parse(fs.readFileSync("./documentFunctions/wordMap.json", "utf-8"));

matchedWord = {};
for (let queryWord in query) {
  matchedWord[queryWord] = {};
  matchedWord[queryWord] = wordMapTFIDF[queryWord];
  matchedWord[queryWord]["Q"] = query[queryWord]["Q"] * wordMap[queryWord]["IDF"];
}

console.log(matchedWord);
