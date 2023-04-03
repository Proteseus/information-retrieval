const fs = require("fs");

// Read json from pressRelease
try {
  var pressRelease = fs.readFileSync("./pressRelease.json", "utf-8");
  pressRelease = JSON.parse(pressRelease);
} catch (err) {
  throw err;
}

// Generate display corpus {id,title,link}
var displayCorpus = [];
pressRelease.forEach((news, index) => {
  displayCorpus.push({ id: index, title: news.title, link: news.url });
});

var functionalCorpus = [];
pressRelease.forEach((news, index) => {
  // Do Lexical analysis
  // Remove signs
  news.story = news.story.replace(/[።:‹›፣፤-]+/g, "");
  //   Remove words with numbers or numbers themselves unless they are date format
  news.story = news.story.replace(
    /(?<!\bዓ\.ም\s*)\b(?!\d{1,2}\/\d{1,2}(\/\d{2,4})?\b)\S*\d+\S*/g,
    ""
  );

  //   Select only unique words
  uniqueWords = news.story.split(" ");
  //   remove the first " "
  uniqueWords.shift();

  functionalCorpus.push({
    id: index,
    index: uniqueWords,
  });
});

// Write Display Corpus
fs.writeFile("./corpus/displayCorpus.json", JSON.stringify(displayCorpus), "utf8", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Display corpus generated");
});

// Write Functional Corpus
fs.writeFile("./corpus/functionalCorpus.json", JSON.stringify(functionalCorpus), "utf8", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Functional corpus generated");
});
