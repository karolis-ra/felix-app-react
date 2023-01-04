import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import LoginForm from '../../components/LoginForm';
import Logo from '../../images/F.png';

import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import './SignInPage.css';

function SigninPage({ logged, login_success, login_error  }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const setUserAndPassword = (e) => {
    e.target.name === 'username'
      ? setUsername(e.target.value)
      : setPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    await fetch('https://dummy-video-api.onrender.com/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          login_success(result.token);
        } else {
          login_error()
        }
      });
  };

  return (
    <div className="App">
      <Header logoImg={Logo} imgAlt="logo image">
        <Button btnStyle="Red-btn" to="/signin" onClick={loginHandler}>
          Sign In
        </Button>
      </Header>
      <main className="Content-block">
        <LoginForm
          loginHandler={loginHandler}
          onChange={setUserAndPassword}
          logged={logged}
        ></LoginForm>
      </main>

      <Footer></Footer>
      {logged && <Navigate to="/userpage" />}
    </div>
  );
}

function mapStateToProps(state) {
  return { logged: state.login.logged};
}

const mapDispatchToProps = (dispatch) => {
  return {
    login_success: (token) => {
      dispatch({ type: 'LOGIN_SUCCESS', token });
    },
    login_error: () => {
      dispatch({ type: 'LOGIN_ERROR' });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
