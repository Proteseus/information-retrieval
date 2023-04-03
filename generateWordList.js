const fs = require("fs");

// Read json from functionalCorpus
try {
  var functionalCorpus = fs.readFileSync("./corpus/functionalCorpus.json", "utf-8");
  functionalCorpus = JSON.parse(functionalCorpus);
} catch (err) {
  throw err;
}

var mergedWords = [];
functionalCorpus.forEach((news) => {
  news.index.forEach((word) => {
    mergedWords.push(word);
  });
});

var wordList = new Set(mergedWords);

var wordMap = {};

wordList.forEach((word) => {
  wordMap[word] = {};
  functionalCorpus.forEach((news, index) => {
    wordMap[word][index] = news.index.includes(word) ? 1 : 0;
  });
});

// Write Functional Corpus
fs.writeFile("wrodMap.json", JSON.stringify(wordMap, null, 2), "utf8", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("word map generated");
});

// console.log(JSON.stringify(wordList));
// console.log(wordList);
