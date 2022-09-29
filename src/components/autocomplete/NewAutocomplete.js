import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState  } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useTranslateWord from '../../hooks/useTranslateWord';

const API_KEY = 'api_key=' + process.env.REACT_APP_TMDM_API_KEY;

export default function NewAutocomplete() {
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const language = useSelector((state) => state.languages.language);
  const navigate = useNavigate();
  const translateWord = useTranslateWord();

  useEffect(() => {
    (async () => {
      setOptions([]);
      let responseMovie = await fetch(`https://api.themoviedb.org/3/search/movie?${API_KEY}&language=${language}&query=${inputValue}`);
      let dataMovie = await responseMovie.json();
      let resultsMovie = dataMovie.results?.map((i) => {
        return {
          label: i.title, 
          id: i.id,
          type: 'movie',
        }
      })

      let responseTV = await fetch(`https://api.themoviedb.org/3/search/tv?${API_KEY}&language=${language}&query=${inputValue}`);
      let dataTV = await responseTV.json();
      let resultsTV = dataTV.results?.map((i) => {
        return {
          label: i.name, 
          id: i.id,
          type: 'tv',
        }
      })
      
      setOptions(resultsMovie.concat(resultsTV));
    })();
  }, [inputValue]);

  const navigateToMovie = () => {
    if (value) {
      if (value.type === 'movie') {
        navigate(`/movie/${value.id}`);
      } else {
        navigate(`/tv/${value.id}`);
      }
    }
  }

  const navigateToSearch = (e) => {
    if (e.keyCode === 13) {
      navigate(`/search/${inputValue}`);
    }
  }

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onSelect={navigateToMovie}
      onKeyUp={(e) => navigateToSearch(e)}
      id="combo-box-demo"
      options={options}
      sx={{ width: '100%' }}
      renderInput={(params) => <TextField {...params} label={translateWord('Найти фильм, сериал', 'Find a movie, a tv')} />}
    />
  );
}

