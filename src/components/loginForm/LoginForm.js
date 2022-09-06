import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import useSignInWithEmail from '../../hooks/useSignInWithEmail';

import './loginForm.scss';

const LoginForm = () => {
  const signInWithEmail = useSignInWithEmail();

  const { register, formState: { errors, isValid }, handleSubmit } = useForm({
    mode: 'onBlur'
  });
  const onSubmit = data => signInWithEmail(data);

  return (
    <div className='login__grid'>
      <h1>Вход</h1>
      <form className='login__form' onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input className='login__input'
          {...register("email", {
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
          })} 
          required
          />
        {errors?.email?.type === "pattern" && <p className='errorMessage login__form_errorEmail'>Пожалуйста, введите корректный адрес электронной почты.</p>}

        <label>Пароль</label>
        <input className='login__input' type={"password"}
          {...register("password")} 
          required
          />

        <input className='login__input login__submitBtn' type="submit" value={'Войти'} disabled={!isValid}/>
      </form>
      <Link to='/registration'>Вы еще не зарегистрированы?</Link>
    </div>
  )
};

export default LoginForm;