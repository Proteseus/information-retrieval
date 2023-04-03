const fs = require("fs");
// Read query word map
try {
  var query = fs.readFileSync("./queryFunctions/queryWordMap.json", "utf-8");
  query = JSON.parse(query);
} catch (err) {
  throw err;
}

// Read document TFIDF word map
try {
  var wordMapTFIDF = fs.readFileSync("./documentFunctions/wordMapTFIDF.json", "utf-8");
  wordMapTFIDF = JSON.parse(wordMapTFIDF);
} catch (err) {
  throw err;
}

// Read document word map
try {
  var wordMap = fs.readFileSync("./documentFunctions/wordMap.json", "utf-8");
  wordMap = JSON.parse(wordMap);
} catch (err) {
  throw err;
}

matchedWord = {};
for (let queryWord in query) {
  matchedWord[queryWord] = {};
  matchedWord[queryWord] = wordMapTFIDF[queryWord];
  matchedWord[queryWord]["Q"] = query[queryWord]["Q"] * wordMap[queryWord]["IDF"];
}

console.log(matchedWord);
