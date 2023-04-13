const GetMatch = require("./utilityFunctions/matchedWordMap");
const GenerateQueryMap = require("./queryFunctions/processQuery");

const FindDocumets = (query) => {
  GenerateQueryMap(query);
  setTimeout(() => {
    console.log(GetMatch());
  }, 2);
};

FindDocumets("ጥላሁን ገሠሠ");
