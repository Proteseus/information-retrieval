const fs = require("fs");
// Read query word map
query = JSON.parse(fs.readFileSync("./queryFunctions/queryWordMap.json", "utf-8"));

// Read document TFIDF word map
wordMapTFIDF = JSON.parse(fs.readFileSync("./documentFunctions/wordMapTFIDF.json", "utf-8"));

// Read document word map
wordMap = JSON.parse(fs.readFileSync("./documentFunctions/wordMap.json", "utf-8"));

TFIDFMap = {};
for (let queryWord in query) {
  TFIDFMap[queryWord] = {};
  TFIDFMap[queryWord] = wordMapTFIDF[queryWord];
  TFIDFMap[queryWord]["Q"] = query[queryWord]["Q"] * wordMap[queryWord]["IDF"];
}

// Find magnitude each word
var magnitudeMap = {};
for (word in TFIDFMap) {
  var count = 0;
  for (var i = 0; i < 1000; i++) {
    count = Math.pow(TFIDFMap[word][i], 2);
  }
  count += Math.pow(TFIDFMap[word]["Q"], 2);
  magnitudeMap[word] = Math.sqrt(count);
}

console.log(magnitudeMap);
