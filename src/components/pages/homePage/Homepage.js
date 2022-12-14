import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useState, useRef } from 'react';

import SimpleSlider from '../../simpleSlider/SimpleSlider';
import Spinner from '../../spinner/Spinner';
import {
  useGetPopularityQuery,
  useGetMostPopularQuery,
  useAutocompleteMovieOrTvQuery,
} from '../../api/moviesApi';
import getColorRating from '../../../helpers/getColorRating';
import noImg from '../../../resources/img/noImg.jpg';
import createDefaultImg from '../../../helpers/createDefaultImg';
import useTranslateWord from '../../../hooks/useTranslateWord';
import debounce from '../../../helpers/debounce';
//import Autocomplete from '../../autocomplete/Autocomplete';
import NewAutocomplete from '../../autocomplete/NewAutocomplete';

import './homePage.scss';

const Homepage = () => {
  window.scrollTo(0, 0);

  const language = useSelector((state) => state.languages.language);

  const navigate = useNavigate();

  const inputRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value) {
      navigate(`/search/${inputRef.current.value}`);
    }
  };

  const {
    data: popularity = {},
    isLoading: popularityLoading,
    isError: popularityError,
  } = useGetPopularityQuery(language);
  let popularityResults = popularity.results ?? [];

  const {
    data: mostPopularity = {},
    isLoading: MostPopularityLoading,
    isError: MostPopularityError,
  } = useGetMostPopularQuery(language);
  let mostPopularityResults = mostPopularity.results ?? [];

  const translateWord = useTranslateWord();

  const [searchWord, setSearchWord] = useState('');
  const [autoCompleteActive, setAutoCompleteActive] = useState();

  const {
    currentData: movieOrTvObj = {},
  } = useAutocompleteMovieOrTvQuery({
    type: 'movie',
    keyWords: searchWord,
    language: language,
  });
  let results = movieOrTvObj.results ?? [];
  let fiveResults = [];
  if (results.length > 0) {
    for(let i = 0; i < 5; i++) {
      if (results[i]) {
        fiveResults.push(results[i]);
      }
    }
  }
  
  //Function for debounce
  const saveInput = (value) => {
    setSearchWord(value);
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

  return (
    <>
      <Helmet>
        <meta name='description' content='Movies information portal' />
        <title>Movies</title>
      </Helmet>
      <section className='homePage__searchBlock'>
        <div className='container'>
          <h1>{translateWord('?????????? ????????????????????!', 'Welcome!')}</h1>
          <h2>
            {translateWord(
              '?????????????????? ??????????????, ???????????????? ?? ??????????????. ???????????????????? ????????????.',
              'Lots of movies, series and actors. Explore now.'
            )}
          </h2>      
          <NewAutocomplete/>    
          {/* <form 
            onSubmit={(e) => onSubmit(e)} 
            onClick={(e) => {
              e.stopPropagation();
              setAutoCompleteActive(true)
            }}>
            <input
              type="text"
              ref={inputRef}
              className='homePage__searchBlock_input'
              placeholder={translateWord(
                '?????????? ??????????...',
                'Find a movie or TV show...'
              )}
              onChange={(e) => {
                autoComplete(e.target.value);
              }}
            />
            <input
              className='homePage__searchBlock_submit'
              type='submit'
              value={translateWord('??????????', 'Search')}
            />
          </form>
          <ul className={autoCompleteActive ? 'homePage__searchBlock_autoComplete' : 'homePage__searchBlock_autoCompleteHidden'}>
            {fiveResults.map(item => (
              <li key={item?.id}>
                <Link to={`/movie/${item?.id}`}>{item?.title}</Link>
              </li>
            ))}
          </ul> */}
        </div>
      </section>

      <section className='homePage__filmsSlider'>
        <div className='container'>
          <SimpleSlider
            title={translateWord('?????? ??????????????????', "What's Popular")}
          >
            {popularityError && (
              <h2>
                {translateWord(
                  '?????????????????? ???????????? ?????? ????????????????',
                  'An error occurred while loading'
                )}
              </h2>
            )}
            {popularityLoading && <Spinner />}
            {popularityResults.map((item) => (
              <div key={item.id} className='homePage__filmsSlider_cards'>
                <div className='homePage__filmsSlider_cardContainer'>
                  <img
                    src={
                      item.poster_path
                        ? 'https://image.tmdb.org/t/p/w500' + item.poster_path
                        : noImg
                    }
                    alt={item.title}
                    onError={(e) => {
                      createDefaultImg(e.target);
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className='homePage__filmsSlider_progress'>
                    <CircularProgressbar
                      value={item.vote_average * 10}
                      text={item.vote_average * 10 + '%'}
                      background={true}
                      styles={getColorRating(item.vote_average)}
                    />
                  </div>
                  <Link to={`/movie/${item.id}`}>{item.title}</Link>
                </div>
              </div>
            ))}
          </SimpleSlider>
        </div>
      </section>

      <section className='homePage__mostPopular'>
        <div className='container'>
          <h2>
            {translateWord(
              '???????????? ???????????? ?????????? ????????',
              'The best films of this year'
            )}
          </h2>
          <div className='homePage__mostPopular_grid'>
            {MostPopularityError && (
              <h2>
                {translateWord(
                  '?????????????????? ???????????? ?????? ????????????????',
                  'An error occurred while loading'
                )}
              </h2>
            )}
            {MostPopularityLoading && <Spinner />}
            {mostPopularityResults.map((item) => (
              <Link
                to={`/movie/${item.id}`}
                key={item.id}
                className='homePage__mostPopular_cards'
              >
                <img
                  src={
                    item.poster_path
                      ? 'https://image.tmdb.org/t/p/w500' + item.poster_path
                      : noImg
                  }
                  alt={item.title}
                  onError={(e) => {
                    createDefaultImg(e.target);
                    e.target.style.display = 'none';
                  }}
                />
                <div className='homePage__mostPopular_progress'>
                  <CircularProgressbar
                    value={item.vote_average * 10}
                    text={item.vote_average * 10 + '%'}
                    background={true}
                    styles={getColorRating(item.vote_average)}
                  />
                </div>
                <h3>{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className='homePage__about'>
        <div className='container'>
          <h2>
            {translateWord(
              '???????????????? ???????????? ?? HD ????????????',
              'Watch movies in HD online'
            )}
          </h2>
          <p>
            {translateWord(
              '?????? ???????? ???????????? ?????????? ?????????????? ???????????????? ????????????? ???????????????????????? ?????????? ???????????????????? ?????????? ??????????????????, ???? ?????????????????????? ???????????? ?????????????? ???? ?????????? ?????????????? ?????????? ?????????????????????????? ?????????????? ??????????????????????. ???? ?????????????? ?????????????? ?? ???????????????????? ?? ?????????? ???????? ?????????????????? ?????? ?????????????????? ?????????? ?? ???????????????????? ?????? ???????? ????????????????. ???????? ???????????? ?????????????? ???? ???????????????? ???????????? ??????????-???? ?????????????????? ??????????????, ?????????? ?????????? ???????????????????? ????????????????????, ???????????? ???????????? ?? ?????????? ?????? ?????????????????????????? ?????????? ???????????????? ???????????? ???? ?????????????? ??????????. ?????? ?????? ???????????????? ???????????? ?????????????? ???????????????????? ???????????????? ???????????? ???????????? ?? ?????????????? HD ???????????????? ???? ?????????? ??????????. ?????????????? ?????????? ??????????????, ???????????????????? ???????? ?????????? ???????????? ?????????????????????? ?? ?????????????????????? ?????????????????????????? ?????? - ?????????????? ?????????????????????? ???????????????? ???????? ?????????????????????????? ??????????????????????????!Watch movies in HD online',
              'What to do with yourself after a hard day at work? Everyday life offers a lot of options, but almost everyone on our planet likes to watch their favorite movies. We have created a convenient and unique cinema for watching videos in comfortable conditions for you. You will never again have to look for some free minute to find suitable cinemas, buy at the box office or book tickets to your favorite places via the Internet. All this is left behind great prospects to watch movies online in good HD quality on our website. Dear guest of the resource, we invite you to plunge into an amazingly fascinating world right now - new film distribution is available to all users around the clock! Watch movies in HD online'
            )}
          </p>

          <h2>{translateWord('?????????????? ????????????', 'TV shows online')}</h2>
          <p>
            {translateWord(
              '?????? ???? ???????????????? ?????????????????????????? ???????????? ?????????????? ?? ????????????????, ?????????????? ???? ???????????? ?????????? ???????????????? ?? HD ????????????????, ???? ???? ?????????????????? ?????????????????????? ?? ?????????????????????? ?????????????????? ?????????????????????????? ?????????? ??????????????????. ????????????, ???????????? ?????????????????? ?????????????????????????????????????? ???????????????? ?????????????????????????? ?????????????????????? ???????????? ???? ?????????? ?????????? ????, ?????? ?????? ???????????????? ???????? ???????????????????????? ???? ?????????????????? ???????????? ?? ???????????????? ????????????????! ???????? ????????????, ?? ???? ???????????????????????? ?????????????????? ?????????? ???????????? ?? ???????????????? ?? ?????????????? ???????????? - ?????? ???????????? ???????????? ???????????????????? ?????????????????????????????? ?????? ???????????? ???????????????????????????? ?? ???????????????? ????????????!Watch movies in HD online',
              'As for the proposed list of films and series that you can watch here in HD quality, it is constantly expanding and supplemented by pictures of the most popular Hollywood hits. In a word, every fan of high-quality world cinema will definitely find on our website something that will give him a lot of pleasure from watching online at home! Invite your friends and you will have a wonderful time together with your close and dear people - our resource will be a great accompaniment for your relaxed and fun vacation! Watch movies in HD online'
            )}
          </p>

          <h2>
            {translateWord(
              '???????????? ?? ?????????????? ???? iPhone, iPad ?? Android ????????????',
              'Movies and TV shows on iPhone, iPad and Android online'
            )}
          </h2>
          <p>
            {translateWord(
              '?? ?????????????? ?????????? ??????????????????????, ?????? ?????????????????? ???????????????????? ???????????????? ?????????????? ???????????? ?? ?????????????? ???? ?????????????????? ?????????????????????? - ?????????? ???? ???????????? ?????????????????? ???????? ???????????????? ?????? ?????????????????????? iPhone, iPad ?????? Android, ???????????????? ?? ?????????? ?????????? ????????! ?? ?????????? ???????????? ???? ???????????? ???????????????????? ???????? ?????????????????????????????? ?????????? ???????????????? ?????????????????????????? ?????????? ?? ?????????????? ?? ???????????? ???????????? ?????????????????? ???????????? ???????????? ?? ?????????????????????????????? ?????? ???????? ?? HD ????????????????. ???????????? ???????? ???????????????? ???????? ???????????????????????? ???? ???????????? ?????????????????? ?? ?????????????????????? ???????? ??????????????????!',
              'Fortunately for our visitors, our cinema offers to watch your favorite movies and series on mobile devices - directly from your smartphone or tablet running iPhone, iPad or Android, from anywhere in the world! And right now we are ready to offer you to take advantage of all the wide possibilities of the site and go to the online viewing session of the best pictures in eye-catching HD quality. We wish you to get a lot of pleasure from the most massive and popular art form!'
            )}
          </p>         
        </div>
      </section>
    </>
  );
};

export default Homepage;
