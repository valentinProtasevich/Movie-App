import { useForm } from 'react-hook-form';
import { Helmet } from "react-helmet";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import SimpleSlider from '../../simpleSlider/SimpleSlider';
import { useGetPopularityQuery, useGetMostPopularQuery } from '../../api/moviesApi';
import getColorRating from '../../../helpers/getColorRating';
import getImg from '../../../helpers/getImg';

import './homePage.scss';

const Homepage = () => {
  const { register, formState: { isValid }, handleSubmit } = useForm({
    mode: 'onChange'
  });
  const onSubmit = dataSearch => console.log(dataSearch);

  const {data: popularity = {}} = useGetPopularityQuery();
  const {data: mostPopularity = {}, error} = useGetMostPopularQuery();
  let popularityResults = popularity.results ?? [];
  let mostPopularityResults = mostPopularity.results ?? [];
  
  return (
    <>
      <Helmet>
        <meta
            name="description"
            content="Movies information portal"
          />
        <title>Movies</title>
      </Helmet>
      <div className="homePage__container">
        <section className="homePage__searchBlock">
          <h1>Добро пожаловать.</h1>
          <h2>Множество фильмов, сериалов и актеров. Исследуйте сейчас.</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input className="homePage__searchBlock_input"
            {...register("search", { required: true })} 
            placeholder = 'Найти фильм, сериал, актера ...'
            />
            <input className="homePage__searchBlock_submit" type="submit" value={'Поиск'} disabled={!isValid}/>
          </form>
        </section>
        <section className='homePage__filmsSlider'>
          <SimpleSlider title='Что популярно'>
            {popularityResults.map(item => (
              <div key={item.id} className='homePage__filmsSlider_cards'>
                <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} />
                  <div className='homePage__filmsSlider_progress'>
                    <CircularProgressbar 
                      value={item.vote_average * 10} 
                      text={item.vote_average * 10 + '%'}
                      styles={getColorRating(item.vote_average)}/>
                  </div>
                  <a href="">{item.title}</a>
              </div>
            ))}
          </SimpleSlider>
        </section>
        <section className='homePage__mostPopular'>
          <h2>Рейтинг 100%</h2>
          <div className='homePage__mostPopular_grid'>
            {mostPopularityResults.map(item => (
              <div key={item.id} className='homePage__mostPopular_cards'>
                {getImg(item.poster_path, item.title)}
                <a href="">{item.title}</a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default Homepage;