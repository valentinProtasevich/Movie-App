import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {useAuth} from '../../hooks/useAuth';
import { removeUser } from '../store/slices/userSlice';
import { setLanguage } from '../store/slices/languagesSlice';
import useTranslateWord from '../../hooks/useTranslateWord';

import './appHeader.scss';

const AppHeader = () => {
  const dispatch = useDispatch();
  const language = useSelector(state => state.languages.language);
  const translateWord = useTranslateWord();

  const {isAuth} = useAuth();

  const changeLanguage = (e) => {
    dispatch(setLanguage({
      language: e.target.value
    }));
  };

  useEffect(() => {
    document.querySelectorAll('.app__navigation_languageBtn').forEach((element) => {
      element.classList.remove('languageActive');
    });
    document.getElementById(`${language}`)?.classList.add('languageActive');
  })

  const activateMenu = () => {
    document.querySelector('.app__navigation').classList.toggle('active');
    document.querySelector('.app__header_burgerBtn').classList.toggle('active');

    if(!document.querySelector('.app__navigation_liMenu')) {
      let menuHeader = document.createElement('li');
      menuHeader.className = 'app__navigation_liMenu';
      menuHeader.innerHTML = 'Меню';
      document.querySelector('ul').prepend(menuHeader);
    }
  };

  const accountButtons = () => {
    if (isAuth) {
      return (
        <>
          <li><NavLink
              onClick={() => {
                dispatch(removeUser());
                activateMenu();
              }} 
              end 
              className={({ isActive }) => "" + (isActive ? " app__navigation_selected" : "")}
              to='/login'>{translateWord('Выйти', 'Logout')}</NavLink>
          </li>
        </>
      )
    } else {
      return (
        <>
          <li><NavLink 
              onClick={activateMenu}
              end 
              className={({ isActive }) => "" + (isActive ? " app__navigation_selected" : "")}
              to='/login'>{translateWord('Вход', 'Login')}</NavLink>
          </li>
          <li><NavLink 
              onClick={activateMenu}
              end 
              className={({ isActive }) => "" + (isActive ? " app__navigation_selected" : "")}
              to='/registration'>{translateWord('Регистрация', 'Registration')}</NavLink>
          </li>
        </>
      )
    }
  };

  return (
    <header className='app__header'>
      <Link className='app__title' to=''>Movies</Link>
      <button className='app__header_burgerBtn' onClick={activateMenu}></button>
      <nav className='app__navigation'>
        <ul>
          <li>
            <button className='app__navigation_languageBtn' value="ru" id='ru' onClick={(e) => changeLanguage(e)}>ru</button>
            <button className='app__navigation_languageBtn' value='en' id='en' onClick={(e) => changeLanguage(e)}>en</button>
          </li>
          <li><NavLink 
                onClick={activateMenu}
                end
                className={({ isActive }) => "" + (isActive ? "app__navigation_selected" : "")}
                to=''>{translateWord('Главная', 'Home')}</NavLink>
          </li>
          <li><NavLink 
            onClick={activateMenu}
            end
            className={({ isActive }) => "" + (isActive ? "app__navigation_selected" : "")}
            to='/movie'>{translateWord('Фильмы', 'Movies')}</NavLink>
          </li>
          <li><NavLink 
                onClick={activateMenu}
                end
                className={({ isActive }) => "" + (isActive ? "app__navigation_selected" : "")}
                to='/tv'>{translateWord('Сериалы', 'TV Shows')}</NavLink>
          </li>
          <li><NavLink 
                onClick={activateMenu}
                end
                className={({ isActive }) => "" + (isActive ? "app__navigation_selected" : "")}
                to='/actors'>{translateWord('Актеры', 'People')}</NavLink>
          </li>
          {accountButtons()}
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;