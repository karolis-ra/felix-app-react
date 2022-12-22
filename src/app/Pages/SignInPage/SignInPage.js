import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import LoginForm from '../../components/LoginForm';
import Logo from '../../images/F.png';

import { Navigate } from 'react-router-dom';

import './SignInPage.css';

function SigninPage({setToken}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logged, setLogged] = useState(null);
  
  const setUserAndPassword = (e) => {
    e.target.name === "username" ? setUsername(e.target.value) : setPassword(e.target.value)
    console.log(e.target.name)
    console.log(e.target.value)
  };

  const loginHandler = useCallback(async() => {
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
          localStorage.setItem('FelixToken', result.token);
          setLogged(true);
          setToken(result.token)
        } else {
          setLogged(false);
        }
      });
  }, [username, password, setToken])


  // useEffect(() => {
  //   loginHandler()
  // }, [loginHandler])

  
    return (
      <div className="App">
        <Header logoImg={Logo} imgAlt="logo image">
          <Button btnStyle="Red-btn" to="/signin">
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
        {logged && <Navigate to='/userpage' />}
      </div>
    );
  }

export default SigninPage;
