    wordMap[word][IDF] = wordMap[word].reduce((count, TF) => {
      count += TF;
      return count;
    }, 0);