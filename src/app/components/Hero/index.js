import React from 'react';
import './index.css';

class Hero extends React.Component {
  render() {
    const { children, title,} = this.props;
    return (
      <div className="Hero">
          <p className="Title-text">{title}</p>
          {children}
      </div>
    );
  }
}

export default Hero;
