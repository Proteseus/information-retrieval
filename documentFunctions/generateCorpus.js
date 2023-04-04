const fs = require("fs");

// Read json from pressRelease
var pressRelease = JSON.parse(fs.readFileSync("./pressRelease.json", "utf-8"));

// Generate display corpus {id,title,link}
const displayCorpus = pressRelease.map(({ title, url }, index) => ({
  id: index,
  title,
  link: url,
}));

// Generate functional corpus {id, index}
var functionalCorpus = pressRelease.map(({ story }, index) => {
  // Remove signs
  story = story.replace(/[።:‹›፣፤-]+/g, "");

  //   Remove words with numbers or numbers themselves unless they are date format
  // story = story.replace(/(?<!\bዓ\.ም\s*)\b(?!\d{1,2}\/\d{1,2}(\/\d{2,4})?\b)\S*\d+\S*/g, "");

  //   split based on space, slice 1 is to remove the first space
  words = story.split(" ").slice(1);

  return {
    id: index,
    index: words,
  };
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
