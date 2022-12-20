import React from 'react';
import './index.css';
import Button from '../Button';

class LoginForm extends React.Component {
  render() {
    const { logged, loginHandler, onChange } = this.props;
    return (
      <form onSubmit={loginHandler} className="Login-form">
        <div className="Input-wrap">
          <label>Username</label>
          <input name="username" type="text" onChange={onChange} />
        </div>

        <div className="Input-wrap">
          <label>Password</label>
          <input name="password" type="password" onChange={onChange} />
        </div>

        <Button btnStyle="Red-btn Login-btn">Sign In</Button>
        {logged === false && (
          <p className="error">Failure: please check the login details.</p>
        )}
      </form>
    );
  }
}

export default LoginForm;
