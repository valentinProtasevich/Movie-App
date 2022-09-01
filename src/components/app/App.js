import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import AppFooter from "../appFooter/AppFooter";
import Spinner from '../spinner/Spinner';


const Homepage = lazy(() => import('../pages/homePage/Homepage'));
const FilmsPage = lazy(() => import('../pages/filmsPage/FilmsPage'));

function App() {
  return (
    <div className="app">
      <AppHeader/>
      <main>
        <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/films' element={<FilmsPage/>} />
          </Routes>
        </Suspense>
      </main>
      <AppFooter/>
    </div>
  );
}

export default App;
