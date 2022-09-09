import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from "react-helmet";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import { useGetFilmsGenresQuery, useGetFilmsWithGenreQuery } from "../../api/moviesApi";
import getColorRating from "../../../helpers/getColorRating";
import Spinner from "../../spinner/Spinner";
import noImg from '../../../resources/img/noImg.jpg';
import createDefaultImg from "../../../helpers/createDefaultImg";
import useTranslateWord from "../../../hooks/useTranslateWord";

import './filmsPage.scss';

const FilmsPage = () => {
  window.scrollTo(0, 0);

  const language = useSelector(state => state.languages.language);
  
  const [genreId, setGenreId] = useState(28);
  const [page, setPage] = useState(1);

  const {
    data: genresObj = {},
    isFetching: genresFetching, 
    isError: genresError
  } = useGetFilmsGenresQuery(language);
  let genres = genresObj.genres ?? [];

  const {
    data: filmsObj ={},
    isFetching: filmsFetching, 
    isError: filmsError
  } = useGetFilmsWithGenreQuery({genreId, page, language});
  let filmsResults = filmsObj.results ?? [];

  useEffect(() => {
    document.querySelectorAll('li').forEach((element) => {
      element.classList.remove('genre__active');
    });
    document.getElementById(`${genreId}`)?.classList.add('genre__active');
    if (page <= 1) {
      document.querySelector('.filmsPage__btnContainer_prevPage').setAttribute('disabled', true);
    } else {
      document.querySelector('.filmsPage__btnContainer_prevPage').removeAttribute('disabled');
    }
  })

  const activateMenu = () => {
    document.querySelector('.filmsPage__categories').classList.toggle('active');
    document.querySelector('.filmsPage__burgerBtn').classList.toggle('active');
  }

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
      <div className="filmsPage__container">
        <section className="filmsPage__categories">
          <h2>{translateWord('Жанры', 'Genres')}</h2>
          <ul>
            {genresError && <h2>{translateWord('Произошла ошибка при загрузке', 'An error occurred while loading')}</h2>}
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

        <button className='filmsPage__burgerBtn' onClick={activateMenu}></button>

        <section className="filmsPage__filmsContainer">
          {filmsError && <h2>{translateWord('Произошла ошибка при загрузке', 'An error occurred while loading')}</h2>}
          {filmsFetching && <Spinner/>}
          <h1>{translateWord('Популярные фильмы', 'Popular movies')}</h1>
          <div className="filmsPage__grid">
            {filmsResults.map(item => (
              <Link to={`/movie/${item.id}`} key={item.id} className='filmsPage__filmCard'>
                <img 
                  src={item.poster_path ? 'https://image.tmdb.org/t/p/w500'+ item.poster_path : noImg} 
                  alt={item.title} 
                  onError={(e) => {
                  createDefaultImg(e.target);
                  e.target.style.display = 'none';
                }}/>
                <div className='filmsPage__filmCard_progress'>
                    <CircularProgressbar 
                      value={item.vote_average * 10} 
                      text={item.vote_average * 10 + '%'}
                      background={true}
                      styles={getColorRating(item.vote_average)}/>
                </div>
                <div className="filmsPage__filmCard_text">
                  <h3>{item.title}</h3>
                  <p>{item.release_date}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="filmsPage__btnContainer">
              <button 
                className="filmsPage__btnContainer_prevPage" 
                onClick={() => {
                  window.scrollTo(0, 0);
                  setPage(page - 1);
                }}>
                {translateWord('Предыдущая страница', 'Previous page')}
              </button>
              <button className="filmsPage__btnContainer_currentPage">{page}</button>
              <button 
                className="filmsPage__btnContainer_nextPage" 
                onClick={() => {
                  window.scrollTo(0, 0);
                  setPage(page + 1);
                }}>
                {translateWord('Следующая страница', 'Next page')}
              </button>
          </div>
        </section>
      </div>
    </>
  )
}

export default FilmsPage;