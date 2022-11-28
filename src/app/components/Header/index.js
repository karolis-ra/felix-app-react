import React from 'react';
import './index.css';

class Header extends React.Component {
  render() {
    return (
      <header className="Header">
        <img src={this.props.logoImg} alt="Logo" className="Logo" />
        {this.props.children}
      </header>
    );
  }
}

export default Header;
