import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from 'react-redux';

import { useGetPopularActorsQuery } from "../../api/moviesApi";
import Spinner from "../../spinner/Spinner";
import noImg from '../../../resources/img/noImg.jpg';
import createDefaultImg from "../../../helpers/createDefaultImg";
import useTranslateWord from "../../../hooks/useTranslateWord";

import './actorsPage.scss';

const ActorsPage = () => {
  window.scrollTo(0, 0);

  const language = useSelector(state => state.languages.language);

  const [page, setPage] = useState(1);

  const {
    data: actorsObj = {},
    isFetching: actorsFetching, 
    isError: actorsError
  } = useGetPopularActorsQuery({page, language});
  let actors = actorsObj.results ?? [];
  console.log(actors);

  useEffect(() => {
    if (page <= 1) {
      document.querySelector('.actorsPage__btnContainer_prevPage').setAttribute('disabled', true);
    } else {
      document.querySelector('.actorsPage__btnContainer_prevPage').removeAttribute('disabled');
    }
  })

  const translateWord = useTranslateWord();
  
  return (
    <>
      <Helmet>
        <meta
            name="description"
            content="Movies information portal"
          />
        <title>Movies: actors</title>
      </Helmet>
      <div className="actorsPage__container">
        <h1>{translateWord('Популярные актеры', 'Popular people')}</h1>

        <div className="actorsPage__grid">
          {actorsError && <h2>{translateWord('Произошла ошибка при загрузке', 'An error occurred while loading')}</h2>}
          {actorsFetching && <Spinner/>}
          {actors.map(item => (
            <div key={item.id} className='actorsPage__actorCard'>
              <img 
                src={item.profile_path ? 'https://image.tmdb.org/t/p/w500'+ item.profile_path : noImg} 
                alt={item.name} 
                onError={(e) => {
                createDefaultImg(e.target);
                e.target.style.display = 'none';
              }}/>
              <h2>{item.name}</h2>
              <ul>
                {item.known_for.map(i => (
                  <li key={i.id}>{i.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="actorsPage__btnContainer">
              <button 
                className="actorsPage__btnContainer_prevPage" 
                onClick={() => {
                  window.scrollTo(0, 0);
                  setPage(page - 1);
                }}>
                {translateWord('Предыдущая страница', 'Previous page')}
              </button>
              <button className="actorsPage__btnContainer_currentPage">{page}</button>
              <button 
                className="actorsPage__btnContainer_nextPage" 
                onClick={() => {
                  window.scrollTo(0, 0);
                  setPage(page + 1);
                }}>
                {translateWord('Следующая страница', 'Next page')}
              </button>
          </div>
      </div>
    </>
  )
}

export default ActorsPage;