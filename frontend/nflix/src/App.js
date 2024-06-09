import './App.scss';
import { useState, useEffect } from 'react';
import api from './api/axiosConfig';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Trailer from './components/Trailer/Trailer';
import Reviews from './components/Reviews/Reviews';

function App() {
  const [movie, setMovie] = useState();
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);

  const getAllMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      if (response.status === 200) {
        setMovies(response.data);
      } else {
        console.log('Unexpected status code:', response.status);
      }
    } catch(error) {
      console.log('Fetch to get movies failed with error: ' + error);
    }
  }

  const getMovie = async (movieId) => {
    try 
    {
        const response = await api.get(`/api/v1/movies/${movieId}`);
        const singleMovie = response.data;
        setMovie(singleMovie);
        setReviews(singleMovie.reviewIds);
    } 
    catch (error) 
    {
      console.error(error);
    }

  }

  useEffect(() => {
    getAllMovies();
  }, [])

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home movies={movies}/>}/>
          <Route path='/trailer/:trailerId' element={<Trailer />}/>
          <Route path="/reviews/:movieId" element ={<Reviews getMovie={getMovie} movie={movie} reviews={reviews} setReviews={setReviews} />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
