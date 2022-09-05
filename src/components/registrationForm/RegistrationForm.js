import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import useRegistrationWithEmail from '../../hooks/useRegistrationWithEmail';

import './registrationForm.scss';

const RegistrationForm = () => {
  const registrationWithEmail = useRegistrationWithEmail();

  const { register, formState: { errors, isValid }, handleSubmit } = useForm({
    mode: 'onBlur'
  });
  const onSubmit = data => {
    if (data.password === data.repeatPassword) {
      registrationWithEmail(data);
    } else {
      alert('Пароли не совпадают.');
    }
  };

  return (
    <div className='registration__grid'>
      <h1>Регистрация</h1>
      <form className='registration__form' onSubmit={handleSubmit(onSubmit)}>
        <label>Имя</label>
        <input className='registration__input'
          {...register("fullName", { 
            pattern:  /^[A-ZА-Я][а-яА-ЯёЁa-zA-Z]+$/
          })} 
          required
          />
        {errors?.fullName?.type === "pattern" && <p className='errorMessage registration__form_errorName'>Имя должно содержать только буквы без пробелов, первая буква должна быть заглавной.</p>}

        <label>Email</label>
        <input className='registration__input'
          {...register("email", {
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
          })} 
          required
          />
        {errors?.email?.type === "pattern" && <p className='errorMessage registration__form_errorEmail'>Пожалуйста, введите корректный адрес электронной почты.</p>}

        <label>Пароль</label>
        <input className='registration__input' type={"password"}
          {...register("password", {
            minLength: 8,
            pattern: /^(?=.*[A-ZА-Я].)(?=.*[!@#$&*])(?=.*[0-9].)(?=.*[a-zа-я].).{8,}$/
          })} 
          required
          />
        {errors?.password?.type === "minLength" && <p className='errorMessage registration__form_errorPassword'>Минимум 8 символов.</p>}
        {errors?.password?.type === "pattern" && <p className='errorMessage registration__form_errorPassword'>Пароль должен включать в себя 1 цифру, 1 прописную букву, 1 строчную букву и 1 спец. символ.</p>}

        <label>Повтор пароля</label>
        <input className='registration__input' type={"password"}
          {...register("repeatPassword", {
            minLength: 8,
            pattern: /^(?=.*[A-ZА-Я].)(?=.*[!@#$&*])(?=.*[0-9].)(?=.*[a-zа-я].).{8,}$/
          })} 
          required
          />
        {errors?.repeatPassword?.type === "minLength" && <p className='errorMessage registration__form_errorRepeatPassword'>Минимум 8 символов.</p>}
        {errors?.repeatPassword?.type === "pattern" && <p className='errorMessage registration__form_errorRepeatPassword'>Пароль должен включать в себя 1 цифру, 1 прописную букву, 1 строчную букву и 1 спец. символ.</p>}

        <input className='registration__input registration__submitBtn' type="submit" value={'Зарегистрироваться'} disabled={!isValid}/>
      </form>
      <p>У вас уже есть аккаунт?</p>
      <Link to='/login'>Войти</Link>
    </div>
  )
}

export default RegistrationForm;