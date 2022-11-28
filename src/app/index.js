import React from 'react';
import Header from './components/Header';
import Button from './components/Button';
import Hero from './components/Hero';
import Card from './components/MovieCard';
import Footer from './components/Footer';

import './index.css';

import Logo from './images/F.png';

class App extends React.Component {
  state = {
    movies: [],
    loading: false,
    error: false,
    favoriteMovies: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      window.addEventListener('DOMContentLoaded', (e) => {
        if (localStorage.getItem('favoriteMovies')) {
          const favoriteMovies = JSON.parse(
            localStorage.getItem('favoriteMovies')
          );
          this.setState({ favoriteMovies });
        }
      });

      const result = await fetch(
        'https://academy-video-api.herokuapp.com/content/free-items'
      );
      if (result.status >= 400 && result.status <= 599) {
        this.setState({ error: true });
      } else {
        const movies = await result.json();
        this.setState({ movies: movies });
      }
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { movies } = this.state;

    const setFavorite = (e) => {
      console.log(this.state.favoriteMovies, 'this is local storage');
      const movieId = e.target.id;
      if (this.state.favoriteMovies) {
        if (!this.state.favoriteMovies.find((movie) => movie === movieId)) {
          this.state.favoriteMovies.push(movieId);
          localStorage.setItem(
            'favoriteMovies',
            JSON.stringify(this.state.favoriteMovies)
          );

          e.target.classList.add('Ghost-btn');
          e.target.innerText = 'Remove';
        }

      } else {
        let movieList = [];
        movieList.push(movieId);
        e.target.classList.add('Ghost-btn');
        e.target.innerText = 'Remove';
        localStorage.setItem('favoriteMovies', JSON.stringify(movieList));
      }
    };

    return (
      <div className="App">
        <Header logoImg={Logo} imgAlt="logo image">
          <Button btnStyle="Red-btn">Sign In</Button>
        </Header>
        <Hero title="Wanna more content?">
          <Button btnStyle="Red-btn">Get Access</Button>
        </Hero>
        <div className="Gray-line"></div>
        <main className="Content">
          <div className="Cards-wraper">
            {movies.map(({ title, id, description, image }) => (
              <Card
                title={title}
                description={description}
                src={image}
                alt={title}
              >
                <Button btnStyle="Card-btn" onClick={setFavorite} id={id}>
                  Favorite
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
}

export default App;
