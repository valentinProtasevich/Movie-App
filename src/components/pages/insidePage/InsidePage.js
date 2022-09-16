import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import { useGetFilmOrSeriesQuery, useGetActorsQuery, useGetImagesQuery, useGetRecommendationsQuery } from '../../api/moviesApi';
import SimpleSlider from '../../simpleSlider/SimpleSlider';
import getColorRating from "../../../helpers/getColorRating";
import Spinner from "../../spinner/Spinner";
import noImg from '../../../resources/img/noImg.jpg';
import createDefaultImg from "../../../helpers/createDefaultImg";
import getSlides from '../../../helpers/getSlides';
import { useAuth } from '../../../hooks/useAuth';
import useTranslateWord from '../../../hooks/useTranslateWord';

import './insidePage.scss'

const InsidePage = ({dataType}) => {
  window.scrollTo(0, 0);

  const language = useSelector(state => state.languages.language);
    
  const {id} = useParams();

  const navigate = useNavigate();

  const {isAuth} = useAuth();

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate('/login');
  //     alert('Пожалуйста авторизуйтесь, чтобы получить доступ к данной странице.');
  //   }
  // }, []);

  const {
    data: filmOrSerieObj = {},
    isFetching: filmOrSerieFetching, 
    isError: filmOrSerieError
  } = useGetFilmOrSeriesQuery({
    type: dataType, 
    id: id, 
    language: language,
  });
  const {backdrop_path, poster_path, title, vote_average, overview} = filmOrSerieObj;

  const {
    data: actorsObj = {},
    isFetching: actorsFetching, 
    isError: actorsError
  } = useGetActorsQuery({
    type: dataType, 
    id: id, 
    language: language
  });
  let actors = [];
  actorsObj.credits?.cast.forEach((i, index) => {
    if (index <= 19) {
      actors.push(i);
    } 
  });

  const {
    data: imagesObj = {},
    isFetching: imagesFetching, 
    isError: imagesError
  } = useGetImagesQuery({
    type: dataType, 
    id: id
  });
  let backdrops = [];
  imagesObj.backdrops?.forEach((i, index) => {
    if (index <= 9) {
      backdrops.push(i);
    } 
  });

  const {
    data: recommendationsObj = {},
    isFetching: recommendationsFetching, 
    isError: recommendationsError
  } = useGetRecommendationsQuery({
    type: dataType, 
    id: id, 
    language: language,
  });
  let recommendations = recommendationsObj.results ?? [];

  const translateWord = useTranslateWord();

  return (
    <>
      <Helmet>
        <meta
            name="description"
            content="Movies information portal"
          />
        <title>Movies: films</title>
      </Helmet>
      <section className='insidePage__description' style={{ backgroundImage: backdrop_path ? `url(https://image.tmdb.org/t/p/w500${backdrop_path})` : `url(${noImg})`}}>
        <div className='insidePage__description_background' >
          <div className='container'>
            {filmOrSerieError && <h2>{translateWord('Произошла ошибка при загрузке', 'An error occurred while loading')}</h2>}
            {filmOrSerieFetching && <Spinner/>}
              <div className='insidePage__description_flex'>
                <img 
                  src={poster_path ? 'https://image.tmdb.org/t/p/w500'+ poster_path : noImg} 
                  alt={title} 
                  onError={(e) => {
                  createDefaultImg(e.target);
                  e.target.style.display = 'none';
                }}/>
                <div className='insidePage__description_flex_textBlock'>
                  <button onClick={() => navigate(-1)}>{translateWord('Вернуться назад', 'Come back')}</button>
                  <h1>{dataType === 'movie' ? title : filmOrSerieObj.name}</h1>
                  <p className='insidePage__description_flex_date'>{dataType === 'movie' ? filmOrSerieObj.release_date : filmOrSerieObj.first_air_date}</p>
                  <div className='insidePage__description_flex_progress'>
                    <CircularProgressbar 
                      value={vote_average * 10} 
                      text={(vote_average * 10).toFixed(0) + '%'}
                      background={true}
                      styles={getColorRating(vote_average)}/>
                  </div>
                  <h3>{overview ? translateWord('Описание', 'Overview') : null}</h3>
                  <p className='insidePage__description_flex_overview'>{overview}</p>
                </div>
              </div>
          </div>
        </div>
      </section>

      <section className='insidePage__actors'>
        <div className='container'>
          <SimpleSlider title={translateWord('В ролях актеры', 'Top Cast')} slides={getSlides()}>
              {actorsError && <h2>{translateWord('Произошла ошибка при загрузке', 'An error occurred while loading')}</h2>}
              {actorsFetching && <Spinner/>}
              {actors.map(item => (
                <div key={item.id} className='insidePage__actors_card'>
                  <img 
                  src={item.profile_path ? 'https://image.tmdb.org/t/p/w500'+ item.profile_path : noImg} 
                  alt={item.name} 
                  onError={(e) => {
                    createDefaultImg(e.target);
                    e.target.style.display = 'none';
                  }}/>
                  <Link to={`/actors/${item.id}`}>{item.name}</Link>
                </div>
              ))}
            </SimpleSlider>
        </div>
      </section>

      <section className='insidePage__backdropsGallery'>
        <div className='container'>
          <h2>{backdrops.length ? translateWord('Фотогалерея', 'Backdrops') : null}</h2>
            <div className='insidePage__backdropsGallery_grid'>
              {imagesError && <h2>{translateWord('Произошла ошибка при загрузке', 'An error occurred while loading')}</h2>}
              {imagesFetching && <Spinner/>}
              {backdrops.map((item, index) => (
                <a key={index} href={`https://image.tmdb.org/t/p/w500/${item.file_path}`} target='_blank' rel='noreferrer'>
                  <img 
                  src={item.file_path ? 'https://image.tmdb.org/t/p/w500'+ item.file_path : noImg} 
                  alt={item.title} 
                  onError={(e) => {
                    createDefaultImg(e.target);
                    e.target.style.display = 'none';
                  }}/>
                </a>
              ))}
            </div>
        </div>
      </section>

      <section className='insidePage__recommendations'>
        <div className='container'>
          <h2>{recommendations.length ? translateWord('Рекомендации', 'Recommendations') : null}</h2>
            <SimpleSlider slides={getSlides()}>
              {recommendationsError && <h2>{translateWord('Произошла ошибка при загрузке', 'An error occurred while loading')}</h2>}
              {recommendationsFetching && <Spinner/>}
              {recommendations.map(item => (
                <div key={item.id} className='insidePage__recommendations_card'>
                  <img 
                  src={item.poster_path ? 'https://image.tmdb.org/t/p/w500'+ item.poster_path : noImg} 
                  alt={item.title} 
                  onError={(e) => {
                    createDefaultImg(e.target);
                    e.target.style.display = 'none';
                  }}/>
                  <Link to={`/${dataType}/${item.id}`}>{item.title ? item.title : item.name}</Link>
                </div>
              ))}
            </SimpleSlider>
        </div>
      </section>
    </>
  )
}

export default InsidePage;