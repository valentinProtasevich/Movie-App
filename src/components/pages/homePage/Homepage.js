import { useForm } from 'react-hook-form';
import { Helmet } from "react-helmet";

import './homePage.scss';

const Homepage = () => {
  const { register, formState: { isValid }, handleSubmit } = useForm({
    mode: 'onChange'
  });
  const onSubmit = data => console.log(data);
  
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
      </div>
    </>
  )
}

export default Homepage;