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

// Get count of total documents
var sampleWord = Object.keys(wordMap)[0];
var documentCount = Object.keys(wordMap[sampleWord]).length - 2;

// Find magnitude each word
var magnitudeMap = {};
for (var i = 0; i < documentCount; i++) {
  count = 0;
  for (word in TFIDFMap) {
    count += Math.pow(TFIDFMap[word][i], 2);
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
    count += TFIDFMap[word][i] * TFIDFMap[word]["Q"];
  }
  dotProductMap[i] = count;
}
// Find similarity
const GetSimilarity = (ma1, ma2, dotProduct) => {
  return dotProduct / (Math.abs(ma1) * Math.abs(ma2));
};

// Generate similarity map
similarityMap = [];
for (i = 0; i < documentCount; i++) {
  similarityMap.push([i, GetSimilarity(magnitudeMap[i], magnitudeMap["Q"], dotProductMap[i])]);
}

// Sort document based on index
var similarityMap = similarityMap.sort((a, b) => b[1] - a[1]);

similarityMap.forEach((element) => {
  console.log(element);
});
