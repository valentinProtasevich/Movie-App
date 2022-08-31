import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import AppFooter from "../appFooter/AppFooter";
import Spinner from '../spinner/Spinner';
//import {Homepage} from '../pages';

const Homepage = lazy(() => import('../pages/homePage/Homepage'));

function App() {
  return (
    <div className="app">
      <AppHeader/>
      <main>
        <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route path='/' element={<Homepage/>} />
          </Routes>
        </Suspense>
      </main>
      <AppFooter/>
    </div>
  );
}

export default App;
