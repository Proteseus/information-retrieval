stop_word_list = [
  "ስለሚሆን",
  "አና",
  "ስለዚህ",
  "በመሆኑም",
  "ሁሉ",
  "ሆነ",
  "ሌላ",
  "ልክ",
  "ስለ",
  "በቀር",
  "ብቻ",
  "ና",
  "አንዳች",
  "አንድ",
  "እንደ",
  "እንጂ",
  "ያህል",
  "ይልቅ",
  "ወደ",
  "እኔ",
  "የእኔ",
  "ራሴ",
  "እኛ",
  "የእኛ",
  "እራሳችን",
  "አንቺ",
  "የእርስዎ",
  "ራስህ",
  "ራሳችሁ",
  "እሱ",
  "እሱን",
  "የእሱ",
  "ራሱ",
  "እርሷ",
  "የእሷ",
  "ራሷ",
  "እነሱ",
  "እነሱን",
  "የእነሱ",
  "እራሳቸው",
  "ምንድን",
  "የትኛው",
  "ማንን",
  "ይህ",
  "እነዚህ",
  "እነዚያ",
  "ነኝ",
  "ነው",
  "ናቸው",
  "ነበር",
  "ነበሩ",
  "ሁን",
  "ነበር",
  "መሆን",
  "አለኝ",
  "አለው",
  "ነበረ",
  "መኖር",
  "ያደርጋል",
  "አደረገው",
  "መሥራት",
  "እና",
  "ግን",
  "ከሆነ",
  "ወይም",
  "ምክንያቱም",
  "እንደ",
  "እስከ",
  "ቢሆንም",
  "ጋር",
  "ላይ",
  "መካከል",
  "በኩል",
  "ወቅት",
  "በኋላ",
  "ከላይ",
  "በርቷል",
  "ጠፍቷል",
  "በላይ",
  "ስር",
  "እንደገና",
  "ተጨማሪ",
  "ከዚያ",
  "አንዴ",
  "እዚህ",
  "እዚያ",
  "መቼ",
  "የት",
  "እንዴት",
  "ሁሉም",
  "ማናቸውም",
  "ሁለቱም",
  "እያንዳንዱ",
  "ጥቂቶች",
  "ተጨማሪ",
  "በጣም",
  "ሌላ",
  "አንዳንድ",
  "አይ",
  "ወይም",
  "አይደለም",
  "ብቻ",
  "የራስ",
  "ተመሳሳይ",
  "ስለዚህ",
  "እኔም",
  "በጣም",
  "ይችላል",
  "ይሆናል",
  "በቃ",
  "አሁን",
  "ነው",
];

const signs = new RegExp("[“…=,.+<>’—”–!?()|:፡‹›፣፤-]", "g");
const multipleSpaces = new RegExp("\\s+", "g");
const englishWords = new RegExp("[a-zA-Z]+", "g");
const numberExceptDate = new RegExp(
  "(?<!\\bዓ\\.ም\\s*)\\b(?!\\d{1,2}\\/\\d{1,2}(\\/\\d{2,4})?\\b)\\S*\\d+\\S*",
  "g"
);
const fs = require("fs");
// Read json from functionalCorpus
functionalCorpus = JSON.parse(fs.readFileSync("./corpus/functionalCorpus.json", "utf-8"));

const getPrunedText = (text) => {
  // Prune signs
  text = text.replace(signs, "");
  //   Prune english
  text = text.replace(englishWords, "");
  // Prune multiple spaces
  text = text.replace(multipleSpaces, " ");

  // Prune numbers except date
  text = text.replace(numberExceptDate, "");

  //   Remove stop words and single characters
  splittedText = text.split(" ");
  text = splittedText.filter((word) => !stop_word_list.includes(word) && word.length > 1);
  return text.join(" ").trim();
};

functionalCorpus.forEach((document, index) => {
  document.index = getPrunedText(document.index);
});

// Write pruned corpus
fs.writeFile("./corpus/pruned.json", JSON.stringify(functionalCorpus, null, 2), "utf8", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Pruned corpus generated");
});
