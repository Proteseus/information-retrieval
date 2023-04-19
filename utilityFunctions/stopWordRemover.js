const Stem = require("./Stemmer").Stem;
stop_word_list = [
  "",
  "ዓ",
  "ገልጽ",
  "ኧናግር",
  "ሆ",
  "ብል",
  "ኧስረድት",
  "ሚገኝ",
  "መሆ",
  "ገለጽ",
  "መሠረት",
  "ኧገር",
  "ነበር",
  "ሪፖርተር",
  "ሥራ",
  "መንግሥት",
  "ሌል",
  "ኧገልግሎት",
  "ኧክል",
  "ሦስት",
  "ቤት",
  "ዳል",
  "ባል",
  "ሕዝብ",
  "መጋብ",
  "ሕግ",
  "ኧቋማት",
  "ኃላፊ",
  "ሚችል",
  "ኧገልጿል",
  "ሚሆ",
  "ድርጅት",
  "ኧንድ",
  "ኧካባቢ",
  "ሰጥ",
  "ኧዲስ",
  "ሥለሚሆ",
  "ኧ",
  "ሥለዚ",
  "ኧሆኑም",
  "ህሉ",
  "ሆ",
  "ሌላ",
  "ልክ",
  "ሥል",
  "ቀር",
  "ብቻ",
  "ና",
  "ኧንድ",
  "ኧንድ",
  "",
  "ጂ",
  "ኣህል",
  "ልቅ",
  "ውደ",
  "ኤ",
  "ኤ",
  "ራሥ",
  "ኛ",
  "ኛ",
  "ራሥ",
  "ኧንቺ",
  "ርሥ",
  "ራሥ",
  "ራሥ",
  "ሡ",
  "ሥ",
  "ሡ",
  "ራሥ",
  "ርሷ",
  "እሷ",
  "ራሷ",
  "ኧሥ",
  "ኧሥ",
  "ኧሥ",
  "ራሥ",
  "ምድን",
  "",
  "ማን",
  "ይህ",
  "ኧዚ",
  "ኧዚያ",
  "ነኝ",
  "",
  "ን",
  "ነበር",
  "ነበር",
  "ህ",
  "ነበር",
  "መሆ",
  "ኧለኝ",
  "ኧል",
  "ንበረ",
  "መኖር",
  "ኣደርግ",
  "ኧደረግ",
  "መሥራት",
  "ኣ",
  "ግን",
  "ሆ",
  "ወይ",
  "ክንያቱም",
  "",
  "ሥክ",
  "ቢሆ",
  "ጋር",
  "ላይ",
  "መካከል",
  "ኩል",
  "ወቅት",
  "ኋላ",
  "ላይ",
  "ርቷል",
  "ጠፍቷል",
  "ላይ",
  "ሥር",
  "ገ",
  "ኧጨማሪ",
  "ዚያ",
  "ኧንድ",
  "ዚ",
  "ዚያ",
  "ም",
  "ት",
  "ዴት",
  "ሁሉ",
  "ማናች",
  "ሁለቱ",
  "ያንዳንድ",
  "ጥቅ",
  "ኧጨማሪ",
  "ጣ",
  "ሌላ",
  "ኧንዳንድ",
  "ኧይ",
  "ወይ",
  "ኧይደል",
  "ብቻ",
  "ራሥ",
  "ኧመሣሣይ",
  "ሥለዚ",
  "ኤም",
  "ጣ",
  "ችል",
  "ሆ",
  "ቃ",
  "ኧህ",
];

common_amh_abbreviations = {
  ትቤት: "ትምህርትቤት",
  ትርት: "ትምህርት",
  ትክፍል: "ትምህርትክፍል",
  ሃአለቃ: "ሃምሳአለቃ",
  ሃስላሴ: "ሃይለስላሴ",
  ደዘይት: "ደብረዘይት",
  ደታቦር: "ደብረታቦር",
  መር: "መምህር",
  መቤት: "መስሪያቤት",
  መአለቃ: "መቶአለቃ",
  ክከተማ: "ክፍለከተማ",
  ክሀገር: "ክፍለሀገር",
  ወር: "",
  ወሮ: "ወይዘሮ",
  ወሪት: "ወይዘሪት",
  ወስላሴ: "ወልደስላሴ",
  ፍስላሴ: "ፍቅረስላሴ",
  ፍቤት: "ፍርድቤት",
  ጽቤት: "ጽህፈትቤት",
  ሲር: "",
  ፕር: "ፕሮፌሰር",
  ጠሚንስትር: "ጠቅላይሚኒስተር",
  ዶር: "ዶክተር",
  ገገዮርጊስ: "",
  ቤክርስትያን: "ቤተክርስትያን",
  ምስራ: "",
  ምቤት: "ምክርቤተ",
  ተሃይማኖት: "ተክለሃይማኖት",
  ሚር: "ሚኒስትር",
  ኮል: "ኮሎኔል",
  ሜጀነራል: "ሜጀርጀነራል",
  ብጀነራል: "ብርጋደርጀነራል",
  ሌኮለኔል: "ሌተናንትኮለኔል",
  ሊመንበር: "ሊቀመንበር",
  አአ: "ኣዲስኣበባ",
  ርመምህር: "ርዕሰመምህር",
  ፕት: "",
  ዓም: "ዓመተምህረት",
  ዓዓ: "ዓመተዓለም",
};

const Multiwords = { "ስነ ልቦናዊ": "ስነልቦናዊ" };
const firstWordsofMultiWords = ["ስነ"];

const signs = new RegExp("[“…=,.+/<>’—”–!?()|:፡።‹›፣፤-]", "g");
const multipleSpaces = new RegExp("\\s+", "g");
const englishWords = new RegExp("[a-zA-Z]+", "g");
const numberExceptDate = new RegExp(
  "(?<!\\bዓ\\.ም\\s*)\\b(?!\\d{1,2}\\/\\d{1,2}(\\/\\d{2,4})?\\b)\\S*\\d+\\S*",
  "g"
);

const getPrunedText = (text) => {
  // Prune signs
  text = text.replace(signs, "");
  //   Prune english
  text = text.replace(englishWords, "");
  // Prune multiple spaces
  text = text.replace(multipleSpaces, " ");

  // Prune numbers except date
  text = text.replace(numberExceptDate, "");

  // text = text.replace(multiWordsPattern, (match, p1) => p1.replace(/\s+/g, "_"));

  //   Remove stop words and single characters
  splittedText = text.split(" ");
  text = splittedText.filter((word) => !stop_word_list.includes(word) && word.length > 1);

  // Merge Mulit-Words
  var prev;
  text = text.map((word, index) => {
    if (!index == 0) {
      if (Multiwords[`${text[index - 1]} ${text[index]}`])
        return Multiwords[`${text[index - 1]} ${text[index]}`];
      return word;
    }
  });
  text.shift();
  text = text.filter((word) => !firstWordsofMultiWords.includes(word));

  // Spread abbreviations
  text = text.map((word) => {
    if (common_amh_abbreviations[word]) return common_amh_abbreviations[word];
    return word;
  });

  // Stem text
  stemmedText = [];
  for (word of text) stemmedText.push(Stem(word));

  // Return raw or stemmed document
  // return stemmedText;
  return text;
};
const PruneCorpus = (corpus) => {
  corpus.forEach((document, index) => {
    document.index = getPrunedText(document.index);
  });
  return corpus;
};

const PruneQuery = (query) => {
  return getPrunedText(query);
};

module.exports = { PruneCorpus, PruneQuery };
