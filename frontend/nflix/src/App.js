import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navigation from './components/Navigation/Navigation';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Trailer from './components/Trailer/Trailer';
import Reviews from './components/Reviews/Reviews';
import useMovies from './hooks/useMovies';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import WatchList from './components/WatchList/WatchList';

function App() {
  const movies = useMovies();

  return (
    <div className="App">
      <UserProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies}/>}/>
          <Route path="/trailer/:trailerId" element={<Trailer />}/>
          <Route path="/reviews/:movieId" element={<Reviews />}/>
          <Route path="/watchList" element={<WatchList />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
