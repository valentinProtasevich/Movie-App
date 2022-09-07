import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from 'react-router-dom';

import { useSearchMovieOrTvQuery } from '../../api/moviesApi';
import Spinner from "../../spinner/Spinner";
import noImg from '../../../resources/img/noImg.jpg';
import createDefaultImg from "../../../helpers/createDefaultImg";

import './searchPage.scss';

const SearchPage = () => {
  window.scrollTo(0, 0);

  const navigate = useNavigate();

  const [type, setType] = useState('movie');

  const {keyWords} = useParams();

  const {
    data: movieOrTvObj = {},
    isFetching: movieOrTvFetching, 
    isError: movieOrTvError
  } = useSearchMovieOrTvQuery([type, keyWords]);
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

  const { register, formState: { isValid }, handleSubmit } = useForm({
    mode: 'onChange'
  });
  const onSubmit = dataSearch => {
    navigate(`/search/${dataSearch.search}`)
  };

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
        <form className='searchPage__form' onSubmit={handleSubmit(onSubmit)}>
          <input className="searchPage__form_input"
          {...register("search", { required: true })} 
          placeholder = 'Найти фильм или сериал...'
          />
          <input className="searchPage__form_submit" type="submit" value={'Поиск'} disabled={!isValid}/>
        </form>

        <div className='searchPage__flexContainer'>
          <section className='searchPage__types'>
            <h2>Результаты поиска:</h2>
            <ul>
              <li 
                id='movie'
                onClick={(e) => {
                  setType(e.target.id);
                  e.target.classList.add('type__active');
                  activateMenu();
                }}>Фильмы</li>
              <li 
                id='tv'
                onClick={(e) => {
                  setType(e.target.id);
                  e.target.classList.add('type__active');
                  activateMenu();
                }}>Сериалы</li>
            </ul>
          </section>

          <button className='searchPage__burgerBtn' onClick={activateMenu}></button>

          <section className='searchPage__results'>
            {movieOrTvError && <h1>Произошла ошибка при загрузке</h1>}
            {movieOrTvFetching && <Spinner/>}
            {results.length === 0 ? <h1>По вашему запросу ничего не найдено.</h1> : null}
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