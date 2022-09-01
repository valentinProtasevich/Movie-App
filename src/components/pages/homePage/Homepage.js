import { useForm } from 'react-hook-form';
import { Helmet } from "react-helmet";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import SimpleSlider from '../../simpleSlider/SimpleSlider';
import Spinner from '../../spinner/Spinner';
import { useGetPopularityQuery, useGetMostPopularQuery } from '../../api/moviesApi';
import getColorRating from '../../../helpers/getColorRating';
import noImg from '../../../resources/img/noImg.jpg';

import './homePage.scss';

const Homepage = () => {
  const { register, formState: { isValid }, handleSubmit } = useForm({
    mode: 'onChange'
  });
  const onSubmit = dataSearch => console.log(dataSearch);

  const {
    data: popularity = {}, 
    isLoading: popularityLoading, 
    isError: popularityError
  } = useGetPopularityQuery();
  const {
    data: mostPopularity = {}, 
    isLoading: MostPopularityLoading, 
    isError: MostPopularityError
  } = useGetMostPopularQuery();
  let popularityResults = popularity.results ?? [];
  let mostPopularityResults = mostPopularity.results ?? [];

  const getSlides = () => {
    if (window.screen.width < 768) {
      return 1
    } else {
      return 5
    }
  }
  
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
          <SimpleSlider title='Что популярно' slides={getSlides()}>
            {popularityError && <h1>Произошла ошибка при загрузке</h1>}
            {popularityLoading && <Spinner/>}
            {popularityResults.map(item => (
              <div key={item.id} className='homePage__filmsSlider_cards'>
                <img src={item.poster_path ? 'https://image.tmdb.org/t/p/w500/'+ item.poster_path : noImg} alt={item.title} />
                <div className='homePage__filmsSlider_progress'>
                  <CircularProgressbar 
                    value={item.vote_average * 10} 
                    text={item.vote_average * 10 + '%'}
                    background={true}
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
            {MostPopularityError && <h1>Произошла ошибка при загрузке</h1>}
            {MostPopularityLoading && <Spinner/>}
            {mostPopularityResults.map(item => (
              <div key={item.id} className='homePage__mostPopular_cards'>
                <img src={item.poster_path ? 'https://image.tmdb.org/t/p/w500/'+ item.poster_path : noImg} alt={item.title} />
                <a href="">{item.title}</a>
              </div>
            ))}
          </div>
        </section>

        <section className='homePage__about'>
          <h2>Смотреть фильмы в HD онлайн</h2>
          <p>Чем себя занять после тяжелых трудовых будней? Повседневная жизнь предлагает массу вариантов, 
            но практически каждый человек на нашей планете любит просматривать любимые кинокартины. 
            Мы создали удобный и уникальный в своем роде кинотеатр для просмотра видео в комфортных 
            для тебя условиях. Тебе больше никогда не придется искать какую-то свободную минутку, 
            чтобы найти подходящие кинотеатры, успеть купить в кассе или забронировать через интернет 
            билеты на любимые места. Все это осталось позади больших перспектив смотреть фильмы онлайн 
            в хорошем HD качестве на нашем сайте. Дорогой гость ресурса, предлагаем тебе прямо сейчас 
            погрузиться в удивительно увлекательный мир - новинки кинопроката доступны всем пользователям 
            круглосуточно!</p>

          <h2>Сериалы онлайн</h2>
          <p>Что же касается предлагаемого списка фильмов и сериалов, которые ты можешь здесь смотреть 
            в HD качестве, то он постоянно расширяется и дополняется картинами популярнейших хитов 
            Голливуда. Словом, каждый поклонник высококачественного мирового кинематографа обязательно 
            найдет на нашем сайте то, что ему доставит море удовольствия от просмотра онлайн в домашних 
            условиях! Зови друзей, и ты замечательно проведешь время вместе с близкими и родными людьми - 
            наш ресурс станет прекрасным аккомпанементом для твоего расслабленного и веселого отдыха!</p>

          <h2>Фильмы и сериалы на iPhone, iPad и Android онлайн</h2>
          <p>К счастью наших посетителей, наш кинотеатр предлагает смотреть любимые фильмы и сериалы на 
            мобильных устройствах - прямо со своего смартфона либо планшета под управлением iPhone, iPad или 
            Android, находясь в любой точке мира! И прямо сейчас мы готовы предложить тебе воспользоваться 
            всеми широкими возможностями сайта и перейти к сеансу онлайн просмотра лучших картин в 
            привлекательном для глаз в HD качестве. Желаем тебе получить море удовольствий от самого 
            массового и популярного вида искусства!</p>
        </section>
      </div>
    </>
  )
}

export default Homepage;