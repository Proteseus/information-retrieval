const fs = require("fs");
const PruneQuery = require("../documentFunctions/stopWordRemover.js").PruneQuery;
var query =
  "ከኦሮሚያ ክልል ለተውጣጡ ለኮሙኒኬሽን አመራርና ባለሙያዎች ሲሰጥ የነበረውን ሥልጠና አጠናቀቀ:: ሥልጠናው የተሰጠው ወቅቱ የሚፈልጋቸውን የሚዲያና ኮሙኒኬሽን ዘርፎችን መሰረት በማድረግ ሲሆን፤ በቴሌቪዥንና የራዲዮ ፕሮግራም፣ የዶክመንታሪና ፕሮሞሽን ዝግጅት፣ በዜናና የዜና ሀታታ አጻፃፍ፣ በሚዲያና ኮሙኒኬሽን ስትራቴጂና እቅድ እንዲሁም በዲጂታል ኮሙኒኬሽን ዘርፍ እንደሆነ ተገልጿል:: በሥልጠናው ላይ የተገኙት የኢትዮጵያ ፕሬስ ድርጅት የይዘት ዘርፍ ምክትል ስራ አስፈፃሚ አቶ ፍቃዱ ከተማ እንደተናገሩት፤ የሁሉም ቤት የሆነውን የኢትዮጵያን ፕሬስ ድርጅት መርጣችሁ እውቀት እንገበያለን፤ ክፍተታችንን እንሞላለን ብላችሁ";

// Prune Query
query = PruneQuery(query);

// Get only the unique words
var wordList = [...new Set(query)];

// Calculate and add TF
var queryLength = query.length;
var wordMap = {};
wordList.forEach((word) => {
  wordMap[word] = {};
  wordMap[word]["Q"] =
    wordList.reduce((count, indexWord) => {
      if (indexWord == word) count++;
      return count;
    }, 0) / queryLength;
});

// Write query word map
fs.writeFile(
  "./queryFunctions/queryWordMap.json",
  JSON.stringify(wordMap, null, 2),
  "utf8",
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("query word map generated");
  }
);
