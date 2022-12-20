import './index.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import HomePage from './Pages/HomePage/HomePage';
import SignInPage from './Pages/SignInPage/SignInPage';
import UserPage from './Pages/UserPage/UserPage';

function App() {
  // const [movies, setMovies] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState(
    JSON.parse(localStorage.getItem('favoriteMovies'))
  );
  const [token, setToken] = useState(null);

  const updateToken = (tokenName) => {
    setToken(localStorage.getItem({ tokenName }));
  };

  const deleteToken = (e) => {
    setToken(null);
    localStorage.removeItem('FelixToken');
  };

  const setFavorite = (e) => {
    const movieId = [];
    movieId.push(e.target.id);

    const favoriteMoviesArray = [...favoriteMovies];
    if (!favoriteMoviesArray.find((movie) => movie === movieId[0])) {
      const updatedFavoriteMovies = favoriteMoviesArray.concat(movieId);
      setFavoriteMovies(updatedFavoriteMovies);
    } else {
      const index = favoriteMoviesArray.findIndex(
        (movie) => movieId[0] === movie
      );
      favoriteMoviesArray.splice(index, 1);
      setFavoriteMovies(favoriteMoviesArray);
    }
  };

  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              favoriteMovies={favoriteMovies}
              setFavorite={(e) => setFavorite(e)}
            />
          }
        />
        <Route path="/signin" element={<SignInPage setToken={updateToken} />} />
        <Route
          path="/userpage"
          element={
            <UserPage
              favoriteMovies={favoriteMovies}
              setFavorite={(e) => setFavorite(e)}
              deleteToken={deleteToken}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
