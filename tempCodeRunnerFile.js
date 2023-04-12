const fs = require("fs");
// Read query word map
query = JSON.parse(fs.readFileSync("./queryFunctions/queryWordMap.json", "utf-8"));

// Read document TFIDF word map
wordMapTFIDF = JSON.parse(fs.readFileSync("./documentFunctions/wordMapTFIDF.json", "utf-8"));

// Read document word map
wordMap = JSON.parse(fs.readFileSync("./documentFunctions/wordMap.json", "utf-8"));

// Get list of the words in our word map
wordList = Object.keys(wordMap);

// Generate TFIDF for all the documents and query
TFIDFMap = {};
for (let queryWord in query) {
  TFIDFMap[queryWord] = {};
  TFIDFMap[queryWord] = wordMapTFIDF[queryWord];
  // If the word is in our word map then calculate TFIDF of Query, else assign 0
  if (TFIDFMap[queryWord])
    TFIDFMap[queryWord]["Q"] = query[queryWord]["Q"] * wordMap[queryWord]["IDF"];
  else TFIDFMap[queryWord] = { Q: 0 };
}

// console.log(TFIDFMap);

// Get count of total documents
var sampleWord = Object.keys(wordMap)[0];
var documentCount = Object.keys(wordMap[sampleWord]).length - 2;

// Find magnitude each word
var magnitudeMap = {};
for (var i = 0; i < documentCount; i++) {
  count = 0;
  for (word in TFIDFMap) {
    // If the word don't exist in our word map, leave the count 0 for the magnitude
    if (TFIDFMap[word][0]) count += Math.pow(TFIDFMap[word][i], 2);
  }
  magnitudeMap[i] = Math.sqrt(count);
}
count = 0;
for (word in TFIDFMap) {
  count += Math.pow(TFIDFMap[word]["Q"], 2);
}
magnitudeMap["Q"] = Math.sqrt(count);

// Find dot product
var dotProductMap = {};
for (var i = 0; i < documentCount; i++) {
  count = 0;
  for (word in TFIDFMap) {
    if (TFIDFMap[word][0]) count += TFIDFMap[word][i] * TFIDFMap[word]["Q"];
  }
  dotProductMap[i] = count;
}
console.log(dotProductMap)