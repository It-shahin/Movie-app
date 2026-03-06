import React, { useState, useEffect } from "react";
import Search from "./components/search";
import Spinner from "./components/spinner";

const API_BASE_URL = 'https://api.themoviedb.org/3';


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTION = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, SetErrorMessage] = useState('')
  const [movielist, setMovielist] = useState([]);
  const [isloading, setIsLoading] = useState([false]);

  const fetchMovies = async () => {
    setIsLoading(true);
    SetErrorMessage('');

    try {
      
      const endpoint =`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTION);

      
      if (!response.ok) {
        throw new Error('Failed to fetch Movies');
      }
      
      const data = await response.json();

      if(data.response == 'False') {
        SetErrorMessage(data.error || 'Failed to fetch movies');
        setMovielist([]);
      }

      setMovielist(data.results || []);

    } catch (error) {
      console.error(`Error fetching: ${error}`);
      SetErrorMessage('Error Fetching movies. Please try Again Later.');
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./src/assets/hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className="mt-10">All Movies</h2>
          
          {isloading ? (
            <Spinner/>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : <ul>
              {movielist.map((movie) => (
                <p key={movie.id} className="text-white">{movie.title}</p>
              ))}
            </ul>}
        </section>
        
      </div>
    </main>
  );
}

export default App;