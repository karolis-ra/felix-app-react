import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Card from '../../components/MovieCard';
import Footer from '../../components/Footer';

import './UserPage.css';

import Logo from '../../images/F.png';

function UserPage({setFavorite, favoriteMovies, deleteToken}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);

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
        const movies = await result.json();
        setMovies(movies);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  fetchData()

}, [])

    return (
      <div className="App">
        <Header logoImg={Logo} imgAlt="logo image">
          <Button btnStyle="Red-btn" to="/" deleteToken={deleteToken}>
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
                <Button btnStyle="Card-btn" onClick={setFavorite} id={id} >
                  {favoriteMovies.includes(id) ? 'Remove' : 'Favorite'}
                </Button>
              </Card>
            ))}
          </div>
        </main>
        <Footer></Footer>
      </div>
    );
  }

export default UserPage;
