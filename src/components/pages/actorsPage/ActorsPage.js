import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { useGetPopularActorsQuery } from "../../api/moviesApi";
import Spinner from "../../spinner/Spinner";
import noImg from '../../../resources/img/noImg.jpg';
import createDefaultImg from "../../../helpers/createDefaultImg";

import './actorsPage.scss';

const ActorsPage = () => {
  window.scrollTo(0, 0);

  const [page, setPage] = useState(1);

  const {
    data: actorsObj = {},
    isFetching: actorsFetching, 
    isError: actorsError
  } = useGetPopularActorsQuery(page);
  let actors = actorsObj.results ?? [];
  console.log(actors);

  useEffect(() => {
    if (page <= 1) {
      document.querySelector('.actorsPage__btnContainer_prevPage').setAttribute('disabled', true);
    } else {
      document.querySelector('.actorsPage__btnContainer_prevPage').removeAttribute('disabled');
    }
  })
  
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
        <h1>Популярные актеры</h1>

        <div className="actorsPage__grid">
          {actorsError && <h1>Произошла ошибка при загрузке</h1>}
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
              Предыдущая страница</button>
              <button className="actorsPage__btnContainer_currentPage">{page}</button>
              <button 
                className="actorsPage__btnContainer_nextPage" 
                onClick={() => {
                  window.scrollTo(0, 0);
                  setPage(page + 1);
                }}>
              Следующая страница</button>
          </div>
      </div>
    </>
  )
}

export default ActorsPage;