const fs = require("fs");
const PruneCorpus = require("../utilityFunctions/stopWordRemover").PruneCorpus;
// Read json from pressRelease
var pressRelease = JSON.parse(fs.readFileSync("./corpus/ScrappedPressRelease.json", "utf-8"));

// Generate display corpus {id,title,link}
const displayCorpus = pressRelease.map(({ title, url, category, story, author, date }, index) => ({
  id: index,
  story: story.slice(0, 250),
  title,
  category,
  link: url,
  author,
  date,
}));

// Generate functional corpus {id, index}
var functionalCorpus = pressRelease.map(({ story, title }, index) => {
  return {
    id: index,
    index: `${story} ${title} ${title} ${title}`,
  };
});

// Prune document
functionalCorpus = PruneCorpus(functionalCorpus);

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
