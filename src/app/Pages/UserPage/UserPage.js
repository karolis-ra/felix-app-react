import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Card from '../../components/MovieCard';
import Footer from '../../components/Footer';

import { connect } from 'react-redux';
import './UserPage.css';

import Logo from '../../images/F.png';

function UserPage({ favMovies, toggleFavorite, logout, setAllMovies, movies }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          'https://dummy-video-api.onrender.com/content/items',
          {
            headers: {
              authorization: localStorage.getItem('FelixToken'),
            },
          }
        );
        if (result.status >= 400 && result.status <= 599) {
          setError(true);
        } else {
          const myMovies = await result.json();
          setAllMovies(myMovies);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Header logoImg={Logo} imgAlt="logo image">
        <Button btnStyle="Red-btn" to="/" deleteToken={logout}>
          Logout
        </Button>
      </Header>
      <div className="Gray-line"></div>
      <main className="Content">
        <div className="Cards-wraper">
          {movies.map(({ title, id, description, image }, index) => (
            <Card
              title={title}
              description={description}
              src={image}
              alt={title}
              key={index}
            >
              <Button
                btnStyle="Card-btn"
                onClick={() => toggleFavorite(id, favMovies)}
                id={id}
              >
                {favMovies.includes(id) ? 'Remove' : 'Favorite'}
              </Button>
            </Card>
          ))}
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    favMovies: state.content.favorites || [],
    movies: state.content.movies || [],
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFavorite: (id, favMovies) => {
      if (favMovies.includes(id)) {
        dispatch({ type: 'REMOVE_FAVORITE', id });
      } else {
        dispatch({ type: 'ADD_FAVORITE', id });
      }
    },
    setAllMovies: (movies) => {
      dispatch({ type: 'SET_MOVIES', movies });
    },
    logout: () => {
      dispatch({ type: 'LOGOUT' });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
