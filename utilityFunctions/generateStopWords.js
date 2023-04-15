const fs = require("fs");
wordMap = JSON.parse(fs.readFileSync("./corpus/DocumentWordMap.json", "utf-8"));
wordMap = Object.keys(wordMap).map((key) => [key, wordMap[key].DF]);
var sorted_TF = wordMap.sort((a, b) => b[1] - a[1]);

var stopWords = "";
wordMap.forEach((word) => {
  if (word[1] > 30) stopWords += ` ${word[0]}`;
});

stopWords = stopWords.split(" ");
for (word of stopWords) console.log(`"${word}",`);
