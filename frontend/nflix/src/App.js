import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Trailer from './components/Trailer/Trailer';
import Reviews from './components/Reviews/Reviews';
import useMovies from './hooks/useMovies';

function App() {
  const movies = useMovies();

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home movies={movies}/>}/>
          <Route path='/trailer/:trailerId' element={<Trailer />}/>
          <Route path="/reviews/:movieId" element ={<Reviews />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
