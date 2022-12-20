import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

class Button extends React.Component {


  render() {
    const { children, btnStyle, onClick, to, deleteToken} = this.props;

    if (to) {
      return <Link className={btnStyle} to={to} onClick={children === "Logout" ? deleteToken : false} >{children}</Link>;
    }

    if (children === "Remove" || children === "Favorite") {
      return (
        <button
          className={children === "Remove" ? 'Card-btn Ghost-btn' : 'Card-btn' }
          onClick={onClick}
          id={this.props.id}
        >
          {children}
        </button>
      );
    } else {
      return <button className={btnStyle} onClick={onClick}>{children}</button>;
    }
  }
}

export default Button;
