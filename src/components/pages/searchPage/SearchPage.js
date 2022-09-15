import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useSearchMovieOrTvQuery, useAutocompleteMovieOrTvQuery } from '../../api/moviesApi';
import Spinner from "../../spinner/Spinner";
import noImg from '../../../resources/img/noImg.jpg';
import createDefaultImg from "../../../helpers/createDefaultImg";
import useTranslateWord from '../../../hooks/useTranslateWord';
import debounce from '../../../helpers/debounce';

import './searchPage.scss';

const SearchPage = () => {
  window.scrollTo(0, 0);

  const language = useSelector(state => state.languages.language);

  const navigate = useNavigate();

  const [type, setType] = useState('movie');

  const {keyWords} = useParams();

  const {
    data: movieOrTvObj = {},
    isFetching: movieOrTvFetching, 
    isError: movieOrTvError
  } = useSearchMovieOrTvQuery({
    type: type, 
    keyWords: keyWords, 
    language: language,
  });
  let results = movieOrTvObj.results ?? [];

  useEffect(() => {
    document.querySelectorAll('li').forEach((element) => {
      element.classList.remove('type__active');
    });
    document.getElementById(`${type}`)?.classList.add('type__active');
  });

  const activateMenu = () => {
    document.querySelector('.searchPage__types').classList.toggle('active');
    document.querySelector('.searchPage__burgerBtn').classList.toggle('active');
  };

  const inputRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value) {
      navigate(`/search/${inputRef.current.value}`);
    }
  };

  const [searchWord, setSearchWord] = useState('');
  const [autoCompleteActive, setAutoCompleteActive] = useState();

  const {
    currentData: autocompleteMovieOrTvObj = {},
  } = useAutocompleteMovieOrTvQuery({
    type: type, 
    keyWords: searchWord, 
    language: language
  });
  let autocompleteResults = autocompleteMovieOrTvObj.results ?? [];
  let fiveResults = [];
  if (autocompleteResults.length > 0) {
    for(let i = 0; i < 5; i++) {
      if (autocompleteResults[i]) {
        fiveResults.push(autocompleteResults[i]);
      }
    }
  }

  //Function for debounce
  const saveInput = (value) => {
    setSearchWord(value);
    console.log('debonce');
  }
  const autoComplete = debounce((value) => saveInput(value));

  document.addEventListener('keyup', (e) => {
    if (e.keyCode === 27) {
      setAutoCompleteActive(false);
    }
  })
  document.addEventListener('click', () => {
    setAutoCompleteActive(false);
  })

  const translateWord = useTranslateWord();

  return (
    <>
      <Helmet>
        <meta
            name="description"
            content="Movies information portal"
          />
        <title>Movies: search</title>
      </Helmet>
      <div className='searchPage__container'>
        <section className='searchPage__searchBlock'>
          <form 
            className='searchPage__form' 
            onSubmit={(e) => onSubmit(e)}
            onClick={(e) => {
              e.stopPropagation();
              setAutoCompleteActive(true)
            }}>
            <input 
              type="text"
              ref={inputRef}
              className="searchPage__form_input"
              placeholder = {translateWord('Найти фильм или сериал...', 'Find a movie or TV show...')}
              onChange={(e) => {
                autoComplete(e.target.value);
              }}
            />
            <input 
              className="searchPage__form_submit" 
              type="submit" 
              value={translateWord('Поиск', 'Search')}
              />
          </form>    
          <ul className={autoCompleteActive ? 'searchPage__searchBlock_autoComplete' : 'searchPage__searchBlock_autoCompleteHidden'}>
            {fiveResults.map(item => (
              <li key={item?.id}>
                <Link to={`/${type}/${item?.id}`}>{type === 'movie' ? item?.title : item?.name}</Link>
              </li>
            ))}
          </ul>
        </section>

        <div className='searchPage__flexContainer'>
          <section className='searchPage__types'>
            <h2>{translateWord('Результаты поиска:', 'Searching results:')}</h2>
            <ul>
              <li 
                id='movie'
                onClick={(e) => {
                  setType(e.target.id);
                  e.target.classList.add('type__active');
                  activateMenu();
                }}>
                  {translateWord('Фильмы', 'Movies')}
                </li>
              <li 
                id='tv'
                onClick={(e) => {
                  setType(e.target.id);
                  e.target.classList.add('type__active');
                  activateMenu();
                }}>
                  {translateWord('Сериалы', 'TV shows')}
                </li>
            </ul>
          </section>

          <button className='searchPage__burgerBtn' onClick={activateMenu}></button>

          <section className='searchPage__results'>
            {movieOrTvError && <h2>{translateWord('Произошла ошибка при загрузке', 'An error occurred while loading')}</h2>}
            {movieOrTvFetching && <Spinner/>}
            {results.length === 0 ? <h2>{translateWord('По вашему запросу ничего не найдено.', 'Nothing was found according to your request.')}</h2> : null}
            {results.map(item => (
              <Link key={item.id} to={`/${type}/${item.id}`}>
                <img 
                  src={item.poster_path ? 'https://image.tmdb.org/t/p/w500'+ item.poster_path : noImg} 
                  alt={item.title} 
                  onError={(e) => {
                  createDefaultImg(e.target);
                  e.target.style.display = 'none';
                }}/>
                <div className='searchPage__results_textBlock'>
                  <h3>{type === 'movie' ? item.title : item.name}</h3>
                  <p className='searchPage__results_date'>{type === 'movie' ? item.release_date : item.first_air_date}</p>
                  <p className='searchPage__results_overview'>{item.overview}</p>
                </div>
              </Link>
            ))}
          </section>
        </div>
      </div>
    </>
  )
}

export default SearchPage;