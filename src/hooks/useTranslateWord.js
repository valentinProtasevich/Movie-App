import { useSelector } from 'react-redux';

const useTranslateWord = () => {
  const language = useSelector(state => state.languages.language);
  
  return  function translateWord(rusWord, engWord) {
    switch (language) {
      case 'ru':
        return rusWord;
        break;
      case 'en':
        return engWord;
        break;
      default:
        break;
    }
  }
}

export default useTranslateWord;