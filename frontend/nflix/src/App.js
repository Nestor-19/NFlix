import './App.css';
import { useState, useEffect } from 'react';
import api from './api/axiosConfig';

function App() {
  const [movies, setMovies] = useState();

  const getAllMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      console.log(response.data);
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
    </div>
  );
}

export default App;
