import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import {useAuth} from '../../hooks/useAuth';
import { removeUser } from '../store/slices/userSlice';
import { setLanguage } from '../store/slices/languagesSlice';
import  translateWord from '../../helpers/translateWord';

import './appHeader.scss';

const AppHeader = () => {
  const dispatch = useDispatch();
  const language = useSelector(state => state.languages.language);

  const {isAuth} = useAuth();

  const changeLanguage = (e) => {
    dispatch(setLanguage({
      language: e.target.value
    }));
  };

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
              to='/login'>{translateWord(language, 'Выйти', 'Logout')}</NavLink>
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
              to='/login'>{translateWord(language, 'Вход', 'Login')}</NavLink>
          </li>
          <li><NavLink 
              onClick={activateMenu}
              end 
              className={({ isActive }) => "" + (isActive ? " app__navigation_selected" : "")}
              to='/registration'>{translateWord(language, 'Регистрация', 'Registration')}</NavLink>
          </li>
        </>
      )
    }
  };

  return (
    <header className='app__header'>
      <h1 className='app__title'>
        <Link to=''>Movies</Link>
      </h1>
      <button className='app__header_burgerBtn' onClick={activateMenu}></button>
      <nav className='app__navigation'>
        <ul>
          <li>
            <select className='app__navigation_languages' value={language} name="languages" id="languages" onChange={(e) => changeLanguage(e)}>
              <option disabled>Language:</option>
              <option value="rus">rus</option>
              <option value="eng">eng</option>
            </select>
          </li>
          <li><NavLink 
                onClick={activateMenu}
                end
                className={({ isActive }) => "" + (isActive ? "app__navigation_selected" : "")}
                to=''>{translateWord(language, 'Главная', 'Home')}</NavLink>
          </li>
          <li><NavLink 
            onClick={activateMenu}
            end
            className={({ isActive }) => "" + (isActive ? "app__navigation_selected" : "")}
            to='/movie'>{translateWord(language, 'Фильмы', 'Movies')}</NavLink>
          </li>
          <li><NavLink 
                onClick={activateMenu}
                end
                className={({ isActive }) => "" + (isActive ? "app__navigation_selected" : "")}
                to='/tv'>{translateWord(language, 'Сериалы', 'TV Shows')}</NavLink>
          </li>
          <li><NavLink 
                onClick={activateMenu}
                end
                className={({ isActive }) => "" + (isActive ? "app__navigation_selected" : "")}
                to='/actors'>{translateWord(language, 'Актеры', 'People')}</NavLink>
          </li>
          {accountButtons()}
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;