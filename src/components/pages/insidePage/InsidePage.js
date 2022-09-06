import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useEffect } from 'react';
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

import './insidePage.scss'

const InsidePage = ({dataType}) => {
  window.scrollTo(0, 0);
    
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
  } = useGetFilmOrSeriesQuery([dataType, id]);
  const {backdrop_path, poster_path, title, vote_average, overview} = filmOrSerieObj;

  const {
    data: actorsObj = {},
    isFetching: actorsFetching, 
    isError: actorsError
  } = useGetActorsQuery([dataType, id]);
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
  } = useGetImagesQuery([dataType, id]);
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
  } = useGetRecommendationsQuery([dataType, id]);
  let recommendations = recommendationsObj.results ?? [];
  console.log(backdrops);

  return (
    <>
      <Helmet>
        <meta
            name="description"
            content="Movies information portal"
          />
        <title>Movies: films</title>
      </Helmet>
      <div className='insidePage__container'>
        <section className='insidePage__description'>
          {filmOrSerieError && <h1>Произошла ошибка при загрузке</h1>}
          {filmOrSerieFetching && <Spinner/>}
          <div className='insidePage__background' style={{ backgroundImage: backdrop_path ? `url(https://image.tmdb.org/t/p/w500${backdrop_path})` : `url(${noImg})`}}>
            <div className='insidePage__description_flex'>
              <img 
                src={poster_path ? 'https://image.tmdb.org/t/p/w500'+ poster_path : noImg} 
                alt={title} 
                onError={(e) => {
                createDefaultImg(e.target);
                e.target.style.display = 'none';
              }}/>
              <div className='insidePage__description_flex_textBlock'>
                <button onClick={() => navigate(-1)}>Вернуться назад</button>
                <h1>{dataType === 'movie' ? title : filmOrSerieObj.name}</h1>
                <p className='insidePage__description_flex_date'>{dataType === 'movie' ? filmOrSerieObj.release_date : filmOrSerieObj.first_air_date}</p>
                <div className='insidePage__description_flex_progress'>
                  <CircularProgressbar 
                    value={vote_average * 10} 
                    text={(vote_average * 10).toFixed(0) + '%'}
                    background={true}
                    styles={getColorRating(vote_average)}/>
                </div>
                <h3>{overview ? 'Описание' : null}</h3>
                <p className='insidePage__description_flex_overview'>{overview}</p>
              </div>
            </div>
          </div>
        </section>

        <section className='insidePage__actors'>
          <SimpleSlider title='В ролях актеры' slides={getSlides()}>
            {actorsError && <h1>Произошла ошибка при загрузке</h1>}
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
                <h3>{item.name}</h3>
              </div>
            ))}
          </SimpleSlider>
        </section>

        <section className='insidePage__backdropsGallery'>
          <h2>Фотогалерея</h2>
          <div className='insidePage__backdropsGallery_grid'>
            {imagesError && <h1>Произошла ошибка при загрузке</h1>}
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
        </section>

        <section className='insidePage__recommendations'>
          <h2>{recommendations.length ? 'Рекомендации' : null}</h2>
          <SimpleSlider slides={getSlides()}>
              {recommendationsError && <h1>Произошла ошибка при загрузке</h1>}
              {recommendationsFetching && <Spinner/>}
              {recommendations.map(item => (
                <div key={item.id} className='insidePage__recommendations_card' onClick={() => navigate(`/${dataType}/${item.id}`)}>
                  <img 
                  src={item.poster_path ? 'https://image.tmdb.org/t/p/w500'+ item.poster_path : noImg} 
                  alt={item.title} 
                  onError={(e) => {
                    createDefaultImg(e.target);
                    e.target.style.display = 'none';
                  }}/>
                  <h3>{item.title ? item.title : item.name}</h3>
                </div>
              ))}
            </SimpleSlider>
        </section>
      </div>
    </>
  )
}

export default InsidePage;