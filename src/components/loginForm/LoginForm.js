import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import useSignInWithEmail from '../../hooks/useSignInWithEmail';
import useTranslateWord from '../../hooks/useTranslateWord';

import './loginForm.scss';

const LoginForm = () => {
  const signInWithEmail = useSignInWithEmail();

  const { register, formState: { errors, isValid }, handleSubmit } = useForm({
    mode: 'onBlur'
  });
  const onSubmit = data => signInWithEmail(data);

  const translateWord = useTranslateWord();

  return (
    <div className='login__grid'>
      <h1>{translateWord('Вход', 'Login')}</h1>
      <form className='login__form' onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input className='login__input'
          {...register("email", {
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
          })} 
          required
          />
        {errors?.email?.type === "pattern" && <p className='errorMessage login__form_errorEmail'>{translateWord('Пожалуйста, введите корректный адрес электронной почты.', 'Please enter a valid email address.')}</p>}

        <label>{translateWord('Пароль', 'Password')}</label>
        <input className='login__input' type={"password"}
          {...register("password")} 
          required
          />

        <input className='login__input login__submitBtn' type="submit" value={translateWord('Войти', 'Login')} disabled={!isValid}/>
      </form>
      <Link to='/registration'>{translateWord('Вы еще не зарегистрированы?', 'You are not registered yet?')}</Link>
    </div>
  )
};

export default LoginForm;