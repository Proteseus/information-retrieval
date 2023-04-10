const fs = require("fs");
// Read json from functionalCorpus
functionalCorpus = JSON.parse(fs.readFileSync("./pruned.json", "utf-8"));

// Push every word in every document into mergedWords
var mergedWords = [];
functionalCorpus.forEach((news) => {
  news.index.forEach((word) => {
    mergedWords.push(word);
  });
});
// Get only the unique words
var wordList = new Set(mergedWords);