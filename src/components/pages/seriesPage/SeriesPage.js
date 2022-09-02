import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import { useGetSeriesGenresQuery, useGetSeriesWithGenreQuery } from "../../api/moviesApi";
import getColorRating from "../../../helpers/getColorRating";
import Spinner from "../../spinner/Spinner";
import noImg from '../../../resources/img/noImg.jpg';
import createDefaultImg from "../../../helpers/createDefaultImg";

import './seriesPage.scss';

const SeriesPage = () => {
  window.scrollTo(0, 0);

  const [genreId, setGenreId] = useState(10759);
  const [page, setPage] = useState(1);

  const {
    data: genresObj = {},
    isFetching: genresFetching, 
    isError: genresError
  } = useGetSeriesGenresQuery();
  let genres = genresObj.genres ?? [];

  const {
    data: seriesObj ={},
    isFetching: seriesFetching, 
    isError: seriesError
  } = useGetSeriesWithGenreQuery({genreId, page});
  let seriesResults = seriesObj.results ?? [];

  useEffect(() => {
    document.querySelectorAll('li').forEach((element) => {
      element.classList.remove('genre__active');
    });
    document.getElementById(`${genreId}`)?.classList.add('genre__active');
    if (page <= 1) {
      document.querySelector('.seriesPage__btnContainer_prevPage').setAttribute('disabled', true);
    } else {
      document.querySelector('.seriesPage__btnContainer_prevPage').removeAttribute('disabled');
    }
  })

  const activateMenu = () => {
    document.querySelector('.seriesPage__categories').classList.toggle('active');
    document.querySelector('.seriesPage__burgerBtn').classList.toggle('active');
  }

  return (
    <>
      <Helmet>
        <meta
            name="description"
            content="Movies information portal"
          />
        <title>Movies: TV series</title>
      </Helmet>
      <div className="seriesPage__container">
        <section className="seriesPage__categories">
          <h2>Жанры</h2>
          <ul>
            {genresError && <h1>Произошла ошибка при загрузке</h1>}
            {genresFetching && <Spinner/>}
            {genres.map(item => (
              <li 
                key={item.id} 
                id={item.id}
                onClick={(e) => {
                  setGenreId(e.target.id);
                  if (genreId !== e.target.id) {
                    setPage(1);
                  }
                  e.target.classList.add('genre__active');
                  activateMenu();
                }}>
              {item.name[0].toUpperCase() + item.name.slice(1)}</li>
            ))}
          </ul>
        </section>

        <button className='seriesPage__burgerBtn' onClick={activateMenu}></button>

        <section className="seriesPage__seriesContainer">
          {seriesError && <h1>Произошла ошибка при загрузке</h1>}
          {seriesFetching && <Spinner/>}
          <h1>Популярные сериалы</h1>
          <div className="seriesPage__grid">
            {seriesResults.map(item => (
              <div key={item.id} className='seriesPage__serieCard'>
                <img 
                  src={item.poster_path ? 'https://image.tmdb.org/t/p/w500'+ item.poster_path : noImg} 
                  alt={item.name} 
                  onError={(e) => {
                  createDefaultImg(e.target);
                  e.target.style.display = 'none';
                }}/>
                <div className='seriesPage__serieCard_progress'>
                    <CircularProgressbar 
                      value={item.vote_average * 10} 
                      text={item.vote_average * 10 + '%'}
                      background={true}
                      styles={getColorRating(item.vote_average)}/>
                </div>
                <a href="">{item.name}</a>
                <p>{item.first_air_date}</p>
              </div>
            ))}
          </div>
          <div className="seriesPage__btnContainer">
              <button 
                className="seriesPage__btnContainer_prevPage" 
                onClick={() => {
                  window.scrollTo(0, 0);
                  setPage(page - 1);
                }}>
              Предыдущая страница</button>
              <button className="seriesPage__btnContainer_currentPage">{page}</button>
              <button 
                className="seriesPage__btnContainer_nextPage" 
                onClick={() => {
                  window.scrollTo(0, 0);
                  setPage(page + 1);
                }}>
              Следующая страница</button>
          </div>
        </section>
      </div>
    </>
  )
}

export default SeriesPage;