const translateWord = (language, rusWord, engWord) => {
  switch (language) {
    case 'rus':
      return rusWord;
      break;
    case 'eng':
      return engWord;
      break;
    default:
      break;
  }
}

export default translateWord;