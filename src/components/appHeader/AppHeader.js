import { NavLink, Link } from 'react-router-dom';

import './appHeader.scss';

const AppHeader = () => {
  return (
    <header className='app__header'>
      <h1 className='app__title'>
        <Link to=''>Movies</Link>
      </h1>
      <nav className='app__navigation'>
        <ul>
          <li><NavLink 
                end
                className={({ isActive }) => "" + (isActive ? " app__navigation_selected" : "")}
                to=''>Главная</NavLink>
          </li>
          <li><NavLink 
                end
                className={({ isActive }) => "" + (isActive ? " app__navigation_selected" : "")}
                to='/films'>Фильмы</NavLink>
          </li>
          <li><NavLink 
                end
                className={({ isActive }) => "" + (isActive ? " app__navigation_selected" : "")}
                to='/series'>Сериалы</NavLink>
          </li>
          <li><NavLink 
                end
                className={({ isActive }) => "" + (isActive ? " app__navigation_selected" : "")}
                to='/actors'>Актеры</NavLink>
          </li>
          <li><NavLink 
                end
                className={({ isActive }) => "" + (isActive ? " app__navigation_selected" : "")}
                to='/login'>Вход</NavLink>
          </li>
          <li><NavLink 
                end
                className={({ isActive }) => "" + (isActive ? " app__navigation_selected" : "")}
                to='/registration'>Регистрация</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;