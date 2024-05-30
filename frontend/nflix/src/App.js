import './App.scss';
import { useState, useEffect } from 'react';
import api from './api/axiosConfig';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';

function App() {
  const [movies, setMovies] = useState([]);

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

  useEffect(() => {
    getAllMovies();
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home movies={movies}/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
