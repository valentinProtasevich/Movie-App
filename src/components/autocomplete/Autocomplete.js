import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {useAutocompleteMovieOrTvQuery} from '../api/moviesApi';
import useTranslateWord from '../../hooks/useTranslateWord';


export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const language = useSelector((state) => state.languages.language);
  const navigate = useNavigate();
  const translateWord = useTranslateWord();

  // const {
  //   currentData: movieOrTvObj = {},
  // } = useAutocompleteMovieOrTvQuery({
  //   type: 'movie',
  //   keyWords: inputValue,
  //   language: language,
  // });
  // let results = [];
  // let data = movieOrTvObj.results ?? [];
  // data.forEach((i) => results.push({
  //   label: i.title, 
  //   id: i.id,
  // }));
  
  React.useEffect(() => {
    let active = true;

    //console.log(results);

    // if (active) {
    //   setOptions([...results]);
    // }

    if (!inputValue) {
      setOptions([]);
    }

    (async () => {
      let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=5ae3a8f60b8d24a2a56d229b72bde9aa&language=${language}&query=${inputValue}`);
      let data = await response.json();
      let results = data.results?.map((i) => {
        return {
          label: i.title, 
          id: i.id,
        }
      })
      console.log(results);
      setOptions([...results]);
      console.log(options);
    })();

    return () => {
      active = false;
    };
  }, [inputValue]);
  
  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const navigateToMovie = () => {
    if (value) {
      navigate(`/movie/${value.id}`);
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
      id="asynchronous-demo"
      sx={{ 
        width: '100%',
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      //isOptionEqualToValue={(option, value) => option.label === value.label}
      //getOptionLabel={(option) => option.label}
      options={options}
      onSelect={navigateToMovie}
      onKeyUp={(e) => navigateToSearch(e)}
      //filterOptions={(x) => x}
      // renderInput={(params) => (
      //   <TextField
      //     {...params}
      //     label={translateWord('Найти фильм', 'Find a movie')}
      //     InputProps={{
      //       ...params.InputProps,
      //       endAdornment: (
      //         <React.Fragment>
      //           {params.InputProps.endAdornment}
      //         </React.Fragment>
      //       ),
      //     }}
      //   />
      // )}
    />
  );
}

