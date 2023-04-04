const fs = require("fs");
var query =
  "ከሐምሌ 2013 እስከ መጋቢት 2015 ዓ.ም ድረስ ባለው ጊዜ በመስቀል አደባባይ የመኪና ማቆሚያ ከ213 ሺህ በላይ መኪናዎች አገልግሎት ማግኘታቸውን የኤግዚቢሽን ማዕከል አስታወቀ። በኤግዚቢሽን ማዕከል የመስቀል አደባባይ ምክትል ሥራ አስኪያጅ አቶ አያሌው መንገሻ ለኢትዮጵያ ፕሬስ ድርጅት እንደተናገሩት፤ የመስቀል አደባባይ የመኪና ማቆሚያ በአካባቢው የሚስተዋለውን የተሽከርካሪ ማቆሚያ ስፍራ  ጥበት ችግርን ለመፍታት ታስቦ የተሰራ እና አንድ ሺህ 400 የሚደርሱ ተሽከርካሪዎችን የሚያስቆም ባለሁለት";
// Do Lexical analysis
// Remove signs
query = query.replace(/[።:‹›፣፤-]+/g, "");
//   Remove words with numbers or numbers themselves unless they are date format
// query = query.replace(/(?<!\bዓ\.ም\s*)\b(?!\d{1,2}\/\d{1,2}(\/\d{2,4})?\b)\S*\d+\S*/g, "");

// Split documents with space
query = query.split(" ");
//   remove the first " "
query.shift();

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
