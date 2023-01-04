import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Hero from '../../components/Hero';
import Card from '../../components/MovieCard';
import Footer from '../../components/Footer';

import './HomePage.css';

import Logo from '../../images/F.png';

function HomePage({ toggleFavorite, favMovies, setAllMovies, movies }) {
  const [error, setError] = useState(false);

  const getData = useCallback(async () => {
    try {
      const result = await fetch(
        'https://dummy-video-api.onrender.com/content/free-items'
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
      setError(false);
    }
  }, [setAllMovies]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="App">
      <Header logoImg={Logo} imgAlt="logo image">
        <Button btnStyle="Red-btn" to="/signin">
          Sign In
        </Button>
      </Header>
      <Hero title="Wanna more content?">
        <Button btnStyle="Red-btn">Get Access</Button>
      </Hero>
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
        <div className="Btn-wrap">
          <Button btnStyle="Red-btn">Get More Content</Button>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
