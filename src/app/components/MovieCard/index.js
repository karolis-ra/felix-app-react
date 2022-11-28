import React from 'react';
import './index.css';

class Card extends React.Component {
  render() {
    const { children, src, alt, title, description} = this.props;
    return (
      <div className="Card">
        <div className="Card-content">
          <img src={src} className="Card-image" alt={alt} />
          <p className="Title">{title}</p>
          <p className="Description">{description}</p>
        </div>

        <div className="Button-wrap">{children}</div>
      </div>
    );
  }
}

export default Card;
