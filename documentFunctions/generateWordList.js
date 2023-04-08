const fs = require("fs");
// Read json from functionalCorpus
functionalCorpus = JSON.parse(fs.readFileSync("../corpus/functionalCorpus.json", "utf-8"));

// Push every word in every document into mergedWords
var mergedWords = [];
functionalCorpus.forEach((news) => {
  news.index.forEach((word) => {
    mergedWords.push(word);
  });
});
// Get only the unique words
var wordList = new Set(mergedWords);

// Calculate and add TF
var wordMap = {};
wordList.forEach((word) => {
  wordMap[word] = {};
  functionalCorpus.forEach((news, index) => {
    wordMap[word][index] =
      // Normalized DF
      // news.index.filter((indexWord) => indexWord == word).length / news.index.length;
      // Non normalized DF
      news.index.filter((indexWord) => indexWord == word).length / news.index.length;
  });
});

// Write word map TFIDF
fs.writeFile(
  "./documentFunctions/wordMapTF.json",
  JSON.stringify(wordMap, null, 2),
  "utf8",
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("word map RFIDF` generated");
  }
);

// // Calculate and add DF
// for (let word in wordMap) {
//   count = 0;
//   for (var i = 0; i < functionalCorpus.length; i++) {
//     if (wordMap[word][i] > 0) count++;
//   }
//   wordMap[word]["DF"] = count;
// }

// // Calculate and add IDF
// var documentCount = functionalCorpus.length;
// for (let word in wordMap) {
//   wordMap[word]["IDF"] = Math.log2(documentCount / wordMap[word]["DF"]);
// }

// // Calculate and add TFIDF
// var wordMapTFIDF = {};
// wordList.forEach((word) => {
//   wordMapTFIDF[word] = {};
//   functionalCorpus.forEach((news, index) => {
//     wordMapTFIDF[word][index] = wordMap[word][index] * wordMap[word]["IDF"];
//   });
// });

// // Write word map
// fs.writeFile(
//   "./documentFunctions/wordMap.json",
//   JSON.stringify(wordMap, null, 2),
//   "utf8",
//   (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log("word map generated");
//   }
// );

// // Write word map TFIDF
// fs.writeFile(
//   "./documentFunctions/wordMapTFIDF.json",
//   JSON.stringify(wordMapTFIDF, null, 2),
//   "utf8",
//   (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log("word map RFIDF` generated");
//   }
// );
