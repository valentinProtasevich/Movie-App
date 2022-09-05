import { NavLink, Link } from 'react-router-dom';

import './appHeader.scss';

const AppHeader = () => {
  const activateMenu = () => {
    document.querySelector('.app__navigation').classList.toggle('active');
    document.querySelector('.app__header_burgerBtn').classList.toggle('active');

    if(!document.querySelector('.app__navigation_liMenu')) {
      let menuHeader = document.createElement('li');
      menuHeader.className = 'app__navigation_liMenu';
      menuHeader.innerHTML = 'Меню';
      document.querySelector('ul').prepend(menuHeader);
    }
  }

  return (
    <header className='app__header'>
      <h1 className='app__title'>
        <Link to=''>Movies</Link>
      </h1>
      <button className='app__header_burgerBtn' onClick={activateMenu}></button>
      <nav className='app__navigation'>
        <ul>
          <li><NavLink 
                onClick={activateMenu}
                end
                className={({ isActive }) => "" + (isActive ? " app__navigation_selected" : "")}
                to=''>Главная</NavLink>
          </li>
          {/* <li><NavLink 
                onClick={activateMenu}
                end
                className={({ isActive }) => "" + (isActive ? " app__navigation_selected" : "")}
                to='/films'>Фильмы</NavLink>
          </li>
          <li><NavLink 
                onClick={activateMenu}
                end
                className={({ isActive }) => "" + (isActive ? " app__navigation_selected" : "")}
                to='/series'>Сериалы</NavLink>
          </li> */}
          <li><NavLink 
            onClick={activateMenu}
            end
            className={({ isActive }) => "" + (isActive ? " app__navigation_selected" : "")}
            to='/movie'>Фильмы</NavLink>
          </li>
          <li><NavLink 
                onClick={activateMenu}
                end
                className={({ isActive }) => "" + (isActive ? " app__navigation_selected" : "")}
                to='/tv'>Сериалы</NavLink>
          </li>
          <li><NavLink 
                onClick={activateMenu}
                end
                className={({ isActive }) => "" + (isActive ? " app__navigation_selected" : "")}
                to='/actors'>Актеры</NavLink>
          </li>
          <li><NavLink 
                onClick={activateMenu}
                end
                className={({ isActive }) => "" + (isActive ? " app__navigation_selected" : "")}
                to='/login'>Вход</NavLink>
          </li>
          <li><NavLink 
                onClick={activateMenu}
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