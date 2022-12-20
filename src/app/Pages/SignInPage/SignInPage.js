import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import LoginForm from '../../components/LoginForm';
import Logo from '../../images/F.png';

import { Navigate } from 'react-router-dom';

import './SignInPage.css';

class SigninPage extends React.Component {
  state = {
    username: '',
    password: '',
    logged: null,
  };
  
  setUserAndPassword = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginHandler = (e) => {
    e.preventDefault();
    fetch('https://dummy-video-api.onrender.com/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          localStorage.setItem('FelixToken', result.token);
          this.setState({ logged: true });
          this.props.setToken(result.token)
        } else {
          this.setState({ logged: false });
        }
      });
  };

  render() {
  
    return (
      <div className="App">
        <Header logoImg={Logo} imgAlt="logo image">
          <Button btnStyle="Red-btn" to="/signin">
            Sign In
          </Button>
        </Header>
        <main className="Content-block">
          <LoginForm
            loginHandler={this.loginHandler}
            onChange={this.setUserAndPassword}
            logged={this.state.logged}
          ></LoginForm>
        </main>

        <Footer></Footer>
        {this.state.logged && <Navigate to='/userpage' />}
      </div>
    );
  }
}

export default SigninPage;
