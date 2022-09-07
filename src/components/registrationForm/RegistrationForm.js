import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import useRegistrationWithEmail from '../../hooks/useRegistrationWithEmail';
import useTranslateWord from '../../hooks/useTranslateWord';

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

  const translateWord = useTranslateWord();

  return (
    <div className='registration__grid'>
      <h1>{translateWord('Регистрация', 'Registration')}</h1>
      <form className='registration__form' onSubmit={handleSubmit(onSubmit)}>
        <label>{translateWord('Имя', 'Name')}</label>
        <input className='registration__input'
          {...register("fullName", { 
            pattern:  /^[A-ZА-Я][а-яА-ЯёЁa-zA-Z]+$/
          })} 
          required
          />
        {errors?.fullName?.type === "pattern" && <p className='errorMessage registration__form_errorName'>{translateWord('Имя должно содержать только буквы без пробелов, первая буква должна быть заглавной.', 'The name must contain only letters without spaces, the first letter must be capitalized.')}</p>}

        <label>Email</label>
        <input className='registration__input'
          {...register("email", {
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
          })} 
          required
          />
        {errors?.email?.type === "pattern" && <p className='errorMessage registration__form_errorEmail'>{translateWord('Пожалуйста, введите корректный адрес электронной почты.', 'Please enter a valid email address.')}</p>}

        <label>{translateWord('Пароль', 'Password')}</label>
        <input className='registration__input' type={"password"}
          {...register("password", {
            minLength: 8,
            pattern: /^(?=.*[A-ZА-Я].)(?=.*[!@#$&*])(?=.*[0-9].)(?=.*[a-zа-я].).{8,}$/
          })} 
          required
          />
        {errors?.password?.type === "minLength" && <p className='errorMessage registration__form_errorPassword'>{translateWord('Минимум 8 символов.', 'Minimum 8 characters.')}</p>}
        {errors?.password?.type === "pattern" && <p className='errorMessage registration__form_errorPassword'>{translateWord('Пароль должен включать в себя 1 цифру, 1 прописную букву, 1 строчную букву и 1 спец. символ.', 'The password must include 1 number, 1 uppercase letter, 1 lowercase letter and 1 special character. symbol.')}</p>}

        <label>{translateWord('Повтор пароля', 'Password repeat')}</label>
        <input className='registration__input' type={"password"}
          {...register("repeatPassword", {
            minLength: 8,
            pattern: /^(?=.*[A-ZА-Я].)(?=.*[!@#$&*])(?=.*[0-9].)(?=.*[a-zа-я].).{8,}$/
          })} 
          required
          />
        {errors?.repeatPassword?.type === "minLength" && <p className='errorMessage registration__form_errorRepeatPassword'>{translateWord('Минимум 8 символов.', 'Minimum 8 characters.')}</p>}
        {errors?.repeatPassword?.type === "pattern" && <p className='errorMessage registration__form_errorRepeatPassword'>{translateWord('Пароль должен включать в себя 1 цифру, 1 прописную букву, 1 строчную букву и 1 спец. символ.', 'The password must include 1 number, 1 uppercase letter, 1 lowercase letter and 1 special character. symbol.')}</p>}

        <input className='registration__input registration__submitBtn' type="submit" value={translateWord('Зарегистрироваться', 'Register')} disabled={!isValid}/>
      </form>
      <p>{translateWord('У вас уже есть аккаунт?', 'Do you already have an account?')}</p>
      <Link to='/login'>{translateWord('Войти', 'Login')}</Link>
    </div>
  )
}

export default RegistrationForm;