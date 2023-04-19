const Multiwords = { "ስነ ልቦናዊ": "ስነልቦናዊ" };
const firstWordsofMultiWords = ["ስነ"];
var sentence = "ሥራዎች ኮርፖሬሽን ስምንት የመስኖ ስነ ልቦናዊ";
sentence = sentence.split(" ");

var prev;
sentence = sentence.map((word, index) => {
  if (!index == 0) {
    if (Multiwords[`${sentence[index - 1]} ${sentence[index]}`])
      return Multiwords[`${sentence[index - 1]} ${sentence[index]}`];
    return word;
  }
});
sentence = sentence.filter((word) => !firstWordsofMultiWords.includes(word));
console.log(sentence);
