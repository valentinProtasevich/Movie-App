import { Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import AppFooter from "../appFooter/AppFooter";
import {Homepage} from '../pages';

function App() {
  return (
    <div className="app">
      <AppHeader/>
      <main>
        <Routes>
          <Route path='/' element={<Homepage/>} />
        </Routes>
      </main>
      <AppFooter/>
    </div>
  );
}

export default App;
