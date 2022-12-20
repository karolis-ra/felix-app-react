import React from 'react';
import Header from "../../components/Header"
import Button from '../../components/Button';
import Hero from '../../components/Hero';
import Card from '../../components/MovieCard';
import Footer from '../../components/Footer';

import './HomePage.css';

import Logo from '../../images/F.png';

class HomePage extends React.Component {
  state = {
    loading: false,
    error: false,
    movies: [],
    favoriteMovies: [],
  };
  
  async componentDidMount() {
    this.setState({ loading: true });

    try {
      if (localStorage.getItem('favoriteMovies')) {
        const favoriteMovies = JSON.parse(
          localStorage.getItem('favoriteMovies')
        );
        this.setState({ favoriteMovies });
      }

      const result = await fetch(
        'https://dummy-video-api.onrender.com/content/free-items'
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
    const {setFavorite, favoriteMovies} = this.props;
    const {movies} = this.state;

    return (
      <div className="App">
        <Header logoImg={Logo} imgAlt="logo image">
          <Button btnStyle="Red-btn" to="/signin">Sign In</Button>
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
                  onClick={setFavorite}
                  id={id}
                >
                  {favoriteMovies.includes(id)
                    ? 'Remove'
                    : 'Favorite'}
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

export default HomePage;
