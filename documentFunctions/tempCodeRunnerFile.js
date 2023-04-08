// Write Display Corpus
fs.writeFile("./corpus/displayCorpus.json", JSON.stringify(displayCorpus), "utf8", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Display corpus generated");
});