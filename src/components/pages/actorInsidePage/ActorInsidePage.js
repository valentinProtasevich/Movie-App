import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from "react-helmet";

import { useGetActorInfoQuery, useGetActorsCreditsQuery } from '../../api/moviesApi';
import useTranslateWord from '../../../hooks/useTranslateWord';
import Spinner from '../../spinner/Spinner';
import noImg from '../../../resources/img/noImg.jpg';
import createDefaultImg from '../../../helpers/createDefaultImg';
import SimpleSlider from '../../simpleSlider/SimpleSlider';

import './actorInsidePage.scss';

const ActorInsidePage = () => {
  window.scrollTo(0, 0);

  const language = useSelector(state => state.languages.language);

  const {id} = useParams();

  const navigate = useNavigate();

  const {
    data: actorInfoObj = {},
    isFetching: actorInfoFetching, 
    isError: actorInfoError
  } = useGetActorInfoQuery({
    id: id, 
    language: language,
  });

  const {
    data: actorsCreditsObj = {},
    isFetching: actorsCreditsFetching, 
    isError: actorsCreditsError
  } = useGetActorsCreditsQuery({
    id: id, 
    language: language,
  });
  let credits = [];
  actorsCreditsObj.cast?.forEach((i, index) => {
    if (index <= 19) {
      credits.push(i);
    } 
  });

  const translateWord = useTranslateWord();
  
  return (
    <>
      <Helmet>
        <meta
            name="description"
            content="Movies information portal"
          />
        <title>Movies: actor</title>
      </Helmet>
      <div className='actorInsidePage__container'>
        <section className='actorInsidePage__facts'>
          {actorInfoError && <h2>{translateWord('Произошла ошибка при загрузке', 'An error occurred while loading')}</h2>}
          {actorInfoFetching && <Spinner/>}
          <img 
            src={actorInfoObj.profile_path ? 'https://image.tmdb.org/t/p/w500'+ actorInfoObj.profile_path : noImg} 
            alt={actorInfoObj.name} 
            onError={(e) => {
            createDefaultImg(e.target);
            e.target.style.display = 'none';
          }}/>
          <h3>{translateWord('Персональная информация', 'Personal Info')}</h3>
          <p>
            <strong>{translateWord('Пол', 'Gender')}</strong>
            {actorInfoObj.gender === 2 ? translateWord('Мужской', 'Male') : translateWord('Женский', 'Female')}
          </p>
          <p>
            <strong>{translateWord('Дата рождения', 'Birthday')}</strong>
            {actorInfoObj.birthday}
          </p>
          <p>
            <strong>{translateWord('Место рождения', 'Place of birthday')}</strong>
            {actorInfoObj.place_of_birth}
          </p>
        </section>

        <section className='actorInsidePage__biography'>
          <h2>{actorInfoObj.name}</h2>
          <h3>{actorInfoObj.biography ? translateWord('Биография', 'Biography') : null}</h3>
          <p>{actorInfoObj.biography}</p>
          <h3>{translateWord('Известность за', 'Known For')}</h3>
          <div className='actorInsidePage__slider'>
            <SimpleSlider>
              {actorsCreditsError && <h2>{translateWord('Произошла ошибка при загрузке', 'An error occurred while loading')}</h2>}
              {actorsCreditsFetching && <Spinner/>}
              {credits.map(item => (
                <div key={item.id} className='actorInsidePage__slider_card'>
                  <img 
                  src={item.poster_path ? 'https://image.tmdb.org/t/p/w500'+ item.poster_path : noImg} 
                  alt={item.title ? item.title : item.name} 
                  onError={(e) => {
                    createDefaultImg(e.target);
                    e.target.style.display = 'none';
                  }}/>
                  <Link to={`/${item.media_type}/${item.id}`}>{item.title ? item.title : item.name}</Link>
                </div>
              ))}
            </SimpleSlider>
          </div>
        </section>
      </div>
    </>
  )
}

export default ActorInsidePage;