import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import AppFooter from "../appFooter/AppFooter";
import Spinner from '../spinner/Spinner';


const Homepage = lazy(() => import('../pages/homePage/Homepage'));
const FilmsPage = lazy(() => import('../pages/filmsPage/FilmsPage'));
const SeriesPage = lazy(() => import('../pages/seriesPage/SeriesPage'));
const ActorsPage = lazy(() => import('../pages/actorsPage/ActorsPage'));
const InsidePage = lazy(() => import('../pages/insidePage/InsidePage'));
const RegistrationPage = lazy(() => import('../pages/registrationPage/RegistrationPage'));

function App() {
  return (
    <div className="app">
      <AppHeader/>
      <main>
        <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/movie' element={<FilmsPage/>} />
            <Route path='/tv' element={<SeriesPage/>} />
            <Route path='/actors' element={<ActorsPage/>} />
            <Route path='/registration' element={<RegistrationPage/>} />
            <Route path='/movie/:id' element={<InsidePage dataType='movie'/>} />
            <Route path='/tv/:id' element={<InsidePage dataType='tv'/>} />
          </Routes>
        </Suspense>
      </main>
      <AppFooter/>
    </div>
  );
}

export default App;
